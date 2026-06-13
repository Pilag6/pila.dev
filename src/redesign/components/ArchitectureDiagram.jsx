import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * ArchitectureDiagram — an SVG data-flow diagram that draws itself in on view.
 * Edges stroke-dash animate; nodes fade+scale. Reduced-motion → static.
 *
 * Tailored to the case study's stated architecture: a layered frontend with a
 * clear unidirectional flow (Edge → App shell → feature islands → design system).
 */
const NODES = [
    { id: "edge", x: 40, y: 120, w: 150, label: "Edge / CDN", sub: "SSG + ISR", accent: true },
    { id: "shell", x: 250, y: 120, w: 160, label: "App Shell", sub: "Router · RSC" },
    { id: "data", x: 470, y: 40, w: 170, label: "Data Layer", sub: "Query cache" },
    { id: "features", x: 470, y: 200, w: 170, label: "Feature Islands", sub: "Lazy · code-split" },
    { id: "ds", x: 700, y: 120, w: 170, label: "Design System", sub: "Tokens · a11y", accent: true },
];

const EDGES = [
    ["edge", "shell"],
    ["shell", "data"],
    ["shell", "features"],
    ["data", "ds"],
    ["features", "ds"],
];

const center = (n) => ({ x: n.x + n.w / 2, y: n.y + 30 });
const byId = (id) => NODES.find((n) => n.id === id);

export default function ArchitectureDiagram() {
    const reduce = useReducedMotion();

    const edgePath = (a, b) => {
        const p1 = center(byId(a));
        const p2 = center(byId(b));
        const mx = (p1.x + p2.x) / 2;
        return `M ${p1.x + byId(a).w / 2} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${
            p2.x - byId(b).w / 2
        } ${p2.y}`;
    };

    return (
        <svg
            className="sg-diagram"
            viewBox="0 0 900 300"
            role="img"
            aria-label="Frontend architecture: Edge/CDN feeds the App Shell, which drives the data layer and lazy-loaded feature islands, all composed from a shared design system."
        >
            {EDGES.map(([a, b], i) => (
                <motion.path
                    key={a + b}
                    className="sg-edge"
                    d={edgePath(a, b)}
                    initial={{ pathLength: reduce ? 1 : 0, opacity: reduce ? 1 : 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: 0.4 + i * 0.12 }}
                />
            ))}

            {NODES.map((n, i) => (
                <motion.g
                    key={n.id}
                    className={n.accent ? "sg-node sg-node--accent" : "sg-node"}
                    initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: i * 0.1 }}
                    style={{ transformOrigin: `${n.x + n.w / 2}px ${n.y + 30}px` }}
                >
                    <rect x={n.x} y={n.y} width={n.w} height={60} rx={10} />
                    <text x={n.x + n.w / 2} y={n.y + 26} textAnchor="middle">
                        {n.label}
                    </text>
                    <text
                        x={n.x + n.w / 2}
                        y={n.y + 44}
                        textAnchor="middle"
                        style={{ fill: "var(--sg-muted)", fontSize: 10 }}
                    >
                        {n.sub}
                    </text>
                </motion.g>
            ))}
        </svg>
    );
}
