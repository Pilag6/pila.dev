import { useEffect, useRef } from "react";

/**
 * CustomCursor — a state-aware dot that grows into a ring over [data-cursor="view"]
 * targets. Pointer-fine only; never rendered on touch (handled in CSS).
 * Uses a rAF-throttled transform write to stay on the compositor.
 */
export default function CustomCursor() {
    const ref = useRef(null);

    useEffect(() => {
        const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduce) return;

        const el = ref.current;
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let tx = x;
        let ty = y;
        let raf = 0;

        const move = (e) => {
            tx = e.clientX;
            ty = e.clientY;
            const t = e.target.closest("[data-cursor]");
            el.dataset.variant = t ? t.getAttribute("data-cursor") : "";
        };

        const render = () => {
            x += (tx - x) * 0.2;
            y += (ty - y) * 0.2;
            el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(render);
        };

        window.addEventListener("pointermove", move, { passive: true });
        raf = requestAnimationFrame(render);
        return () => {
            window.removeEventListener("pointermove", move);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <div className="sg-cursor" ref={ref} aria-hidden="true" />;
}
