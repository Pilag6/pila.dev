import { useEffect } from "react";
import Lenis from "lenis";

/**
 * useLenis — momentum smooth-scroll, disabled under reduced-motion.
 * Returns nothing; mounts/destroys the Lenis instance with the component.
 */
export default function useLenis() {
    useEffect(() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const lenis = new Lenis({
            duration: 1.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        let raf = 0;
        const loop = (time) => {
            lenis.raf(time);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
        };
    }, []);
}
