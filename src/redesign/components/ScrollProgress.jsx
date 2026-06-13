import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — a thin accent bar tracking page scroll. Honors reduced
 * motion implicitly: it reflects position, never auto-animates.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
    return <motion.div className="sg-scrollbar" style={{ scaleX }} aria-hidden="true" />;
}
