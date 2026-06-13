import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic — element drifts toward the cursor with a capped displacement,
 * spring-eased. Disabled entirely for reduced-motion / touch.
 */
export default function Magnetic({ children, strength = 0.35, max = 18, className, ...rest }) {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const onMove = (e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        x.set(Math.max(-max, Math.min(max, dx * strength)));
        y.set(Math.max(-max, Math.min(max, dy * strength)));
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.span
            ref={ref}
            className={className}
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={{ x: sx, y: sy, display: "inline-flex" }}
            {...rest}
        >
            {children}
        </motion.span>
    );
}
