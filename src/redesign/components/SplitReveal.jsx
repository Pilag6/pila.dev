import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

const DEFAULT_VIEWPORT = { once: true, amount: 0, margin: "0px 0px -15% 0px" };

/**
 * SplitReveal — line-by-line masked reveal for headlines.
 * Pass an array of lines. Each line sits in an overflow-hidden mask and
 * slides up on enter. Reduced-motion → instant fade, no mask animation.
 */
export default function SplitReveal({
    lines,
    className,
    lineClassName,
    delay = 0,
    stagger = 0.09,
    trigger = "view",
    viewport = DEFAULT_VIEWPORT,
}) {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const inView = useInView(ref, viewport);
    const target = { y: 0, opacity: 1 };
    const shouldPlay = trigger === "mount" || inView;

    return (
        <span ref={ref} className={className} aria-label={lines.join(" ")}>
            {lines.map((line, i) => (
                <span
                    key={line + i}
                    aria-hidden="true"
                    className="sg-split__mask"
                >
                    <motion.span
                        className={lineClassName}
                        style={{ display: "block", willChange: "transform" }}
                        initial={{ y: reduce ? 0 : "115%", opacity: reduce ? 0 : 1 }}
                        animate={shouldPlay ? target : undefined}
                        transition={{
                            duration: reduce ? 0.2 : 1,
                            ease: EASE,
                            delay: delay + i * stagger,
                        }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
