import { useMemo, useRef } from "react";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import {
    SiReact,
    SiVuedotjs,
    SiNextdotjs,
    SiNuxtdotjs,
    SiTypescript,
    SiJavascript,
    SiNodedotjs,
    SiPostgresql,
    SiTailwindcss,
    SiVite,
    SiThreedotjs,
    SiDocker,
    SiFigma,
    SiZod,
    SiReactquery,
    SiStorybook,
    SiPosthog,
    SiTurborepo,
} from "react-icons/si";
import { stack } from "../siteData.js";
import Reveal from "./Reveal.jsx";

const ICONS = {
    react: SiReact,
    vue: SiVuedotjs,
    next: SiNextdotjs,
    nuxt: SiNuxtdotjs,
    typescript: SiTypescript,
    javascript: SiJavascript,
    node: SiNodedotjs,
    postgres: SiPostgresql,
    zod: SiZod,
    tanstack: SiReactquery,
    storybook: SiStorybook,
    posthog: SiPosthog,
    turborepo: SiTurborepo,
    tailwind: SiTailwindcss,
    vite: SiVite,
    three: SiThreedotjs,
    docker: SiDocker,
    figma: SiFigma,
};

const STEP = 8;
const COPIES = 3;
const cycleDegrees = stack.length * STEP;
const TRAVEL = cycleDegrees * 2;

const buildLoopItems = (copies) =>
    Array.from({ length: copies }, (_, copyIndex) =>
        stack.map((tech, itemIndex) => ({
            ...tech,
            uid: `${tech.id}-${copyIndex}`,
            globalIndex: copyIndex * stack.length + itemIndex,
        }))
    ).flat();

/**
 * Stack — an arc carousel of tech logos. Cards sit on a large circle whose
 * center is far below the section, so only the top cap shows as a gentle arc.
 * The deck is tiled three times around the ring so logos that exit one edge
 * re-enter from the other · an infinite scroll-driven carousel.
 * Reduced-motion → a static, centered arc (single copy).
 */
export default function Stack() {
    const reduce = useReducedMotion();
    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "end 0.2"],
    });

    const rotateRaw = useTransform(scrollYProgress, [0, 1], [0, -TRAVEL]);
    const rotate = useSpring(rotateRaw, { stiffness: 90, damping: 26, mass: 0.6 });

    const centerGlobalIndex = stack.length + (stack.length - 1) / 2;
    const copyCount = reduce ? 1 : COPIES;

    const cards = useMemo(() => {
        const items = buildLoopItems(copyCount);
        const offset = reduce ? (stack.length - 1) / 2 : centerGlobalIndex;

        return items.map((item) => {
            const index = reduce ? item.globalIndex % stack.length : item.globalIndex;
            const angle = (index - offset) * STEP;
            return {
                ...item,
                angle,
                zIndex: Math.round(120 - Math.abs(angle) * 0.75),
            };
        });
    }, [copyCount, centerGlobalIndex, reduce]);

    return (
        <section className="sg-section sg-stack" id="stack" ref={ref}>
            <div className="sg-shell">
                <Reveal>
                    <span className="sg-eyebrow">The stack</span>
                </Reveal>
                <Reveal delay={0.05}>
                    <p className="sg-h2 sg-stack__title">
                    The tools I trust to build modern software experiences.
                    </p>
                </Reveal>
            </div>

            <div className="sg-stack__stage" aria-hidden="true">
                <div className="sg-stack__glow" />
                <motion.div
                    className="sg-stack__ring"
                    style={{ rotate: reduce ? 0 : rotate }}
                >
                    {cards.map((tech) => {
                        const Icon = ICONS[tech.id];
                        if (!Icon) return null;
                        return (
                            <div
                                key={tech.uid}
                                className="sg-stack__card"
                                style={{
                                    "--card-color": tech.color,
                                    "--card-z": tech.zIndex,
                                    transform: `rotate(${tech.angle}deg) translateY(calc(var(--stack-r) * -1))`,
                                }}
                            >
                                <span className="sg-stack__icon">
                                    <Icon />
                                </span>
                                <span className="sg-stack__label">{tech.label}</span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <ul className="sg-visually-hidden">
                {stack.map((tech) => (
                    <li key={tech.id}>{tech.label}</li>
                ))}
            </ul>
        </section>
    );
}
