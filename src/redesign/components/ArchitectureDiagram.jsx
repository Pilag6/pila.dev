import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const DEFAULT_NODES = [
    { id: "edge", x: 40, y: 120, w: 150, label: "Edge / CDN", sub: "SSG + ISR", accent: true },
    { id: "shell", x: 250, y: 120, w: 160, label: "App Shell", sub: "Router · RSC" },
    { id: "data", x: 470, y: 40, w: 170, label: "Data Layer", sub: "Query cache" },
    { id: "features", x: 470, y: 200, w: 170, label: "Feature Islands", sub: "Lazy · code-split" },
    { id: "ds", x: 700, y: 120, w: 170, label: "Design System", sub: "Tokens · a11y", accent: true },
];

const DEFAULT_EDGES = [
    ["edge", "shell"],
    ["shell", "data"],
    ["shell", "features"],
    ["data", "ds"],
    ["features", "ds"],
];

const HUTLIFY_NODES = [
    { id: "component", x: 20, y: 120, w: 130, label: "Component", sub: "Vue 3", accent: true },
    { id: "query", x: 185, y: 120, w: 135, label: "Query / mutation", sub: "Pinia Colada" },
    { id: "service", x: 355, y: 120, w: 120, label: "Client service", sub: "tRPC boundary" },
    { id: "router", x: 510, y: 120, w: 120, label: "Server router", sub: "tRPC v11" },
    { id: "domain", x: 665, y: 120, w: 115, label: "Domain service", sub: "Business logic" },
    { id: "db", x: 815, y: 120, w: 70, label: "DB", sub: "SQLite", accent: true },
];

const HUTLIFY_EDGES = [
    ["component", "query"],
    ["query", "service"],
    ["service", "router"],
    ["router", "domain"],
    ["domain", "db"],
];

const TBA_NODES = [
    { id: "content", x: 10, y: 120, w: 125, label: "Content", sub: "MDX · JSON · YAML", accent: true },
    { id: "collections", x: 165, y: 120, w: 135, label: "Collections", sub: "Typed schemas" },
    { id: "context", x: 330, y: 120, w: 135, label: "Build context", sub: "Cached indexes" },
    { id: "graph", x: 495, y: 120, w: 130, label: "Validation", sub: "Content graph" },
    { id: "routes", x: 655, y: 120, w: 110, label: "Routes", sub: "View models" },
    { id: "output", x: 795, y: 120, w: 95, label: "Output", sub: "Static HTML", accent: true },
];

const TBA_EDGES = [
    ["content", "collections"],
    ["collections", "context"],
    ["context", "graph"],
    ["graph", "routes"],
    ["routes", "output"],
];

const center = (nodes, n) => ({ x: n.x + n.w / 2, y: n.y + 30 });
const byId = (nodes, id) => nodes.find((n) => n.id === id);

export default function ArchitectureDiagram({ variant = "default" }) {
    const reduce = useReducedMotion();
    const isHutlify = variant === "hutlify";
    const isTba = variant === "tba";
    const nodes = isHutlify ? HUTLIFY_NODES : isTba ? TBA_NODES : DEFAULT_NODES;
    const edges = isHutlify ? HUTLIFY_EDGES : isTba ? TBA_EDGES : DEFAULT_EDGES;

    const edgePath = (a, b) => {
        const from = byId(nodes, a);
        const to = byId(nodes, b);
        const p1 = center(nodes, from);
        const p2 = center(nodes, to);
        const mx = (p1.x + p2.x) / 2;
        return `M ${p1.x + from.w / 2} ${p1.y} C ${mx} ${p1.y}, ${mx} ${p2.y}, ${p2.x - to.w / 2} ${p2.y}`;
    };

    return (
        <svg
            className="sg-diagram"
            viewBox="0 0 900 300"
            role="img"
            aria-label={
                isHutlify
                    ? "Hutlify data flow: Vue component to query or mutation, client service, tRPC server router, domain service, and SQLite persistence."
                    : isTba
                      ? "The Berlin Around publishing pipeline: structured content flows through typed collections, a cached build context, content graph validation, route view models, and static HTML output."
                      : "Frontend architecture: Edge/CDN feeds the App Shell, which drives the data layer and lazy-loaded feature islands, all composed from a shared design system."
            }
        >
            {edges.map(([a, b], i) => (
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

            {nodes.map((n, i) => (
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
