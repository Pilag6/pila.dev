import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

/**
 * Reveal — opacity + small translate on scroll-enter.
 * Reduced-motion safe: collapses to a plain opacity fade with no transform.
 */
export default function Reveal({
    children,
    as = "div",
    delay = 0,
    y = 24,
    className,
    once = true,
    trigger = "view",
    ...rest
}) {
    const reduce = useReducedMotion();
    const MotionTag = motion[as] || motion.div;

    // "mount" plays immediately (for above-the-fold hero content);
    // "view" plays when scrolled into view (default for everything else).
    const playProps =
        trigger === "mount"
            ? { animate: { opacity: 1, y: 0 } }
            : {
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once, margin: "-12% 0px -12% 0px" },
              };

    return (
        <MotionTag
            className={className}
            initial={{ opacity: 0, y: reduce ? 0 : y }}
            {...playProps}
            transition={{ duration: reduce ? 0.2 : 0.9, ease: EASE, delay }}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}
