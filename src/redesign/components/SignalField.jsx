import { useEffect, useRef } from "react";

/**
 * SignalField — a 2D canvas particle field that resolves from "noise" into an
 * ordered grid (the Noise→Signal motif), gently reacting to the cursor.
 *
 * Performance contract:
 *  - DPR capped at 2, particle count scales with viewport but is bounded.
 *  - Paused via IntersectionObserver when off-screen and on tab blur.
 *  - prefers-reduced-motion → renders a single static frame, no RAF loop.
 */
export default function SignalField() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: true });
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        let raf = 0;
        let running = true;
        let w = 0;
        let h = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const pointer = { x: -9999, y: -9999 };
        let particles = [];

        const ACCENT = "77, 225, 193";

        const build = () => {
            w = canvas.clientWidth;
            h = canvas.clientHeight;
            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const gap = w < 640 ? 46 : 38;
            const cols = Math.ceil(w / gap) + 1;
            const rows = Math.ceil(h / gap) + 1;
            particles = [];
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const tx = c * gap;
                    const ty = r * gap;
                    particles.push({
                        tx,
                        ty,
                        // start scattered ("noise"), resolve toward the grid
                        x: tx + (Math.random() - 0.5) * 260,
                        y: ty + (Math.random() - 0.5) * 260,
                        seed: Math.random() * Math.PI * 2,
                    });
                }
            }
        };

        const draw = (t) => {
            ctx.clearRect(0, 0, w, h);
            const time = t * 0.0006;
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                // ease toward the ordered target
                p.x += (p.tx - p.x) * 0.04;
                p.y += (p.ty - p.y) * 0.04;
                // subtle organic drift
                const driftX = Math.sin(time + p.seed) * 3;
                const driftY = Math.cos(time + p.seed * 1.3) * 3;

                // pointer repulsion
                const dx = p.x - pointer.x;
                const dy = p.y - pointer.y;
                const dist = Math.hypot(dx, dy);
                let px = 0;
                let py = 0;
                if (dist < 140) {
                    const force = (1 - dist / 140) * 18;
                    px = (dx / (dist || 1)) * force;
                    py = (dy / (dist || 1)) * force;
                }

                const fx = p.x + driftX + px;
                const fy = p.y + driftY + py;
                const near = dist < 140 ? 1 - dist / 140 : 0;
                const alpha = 0.12 + near * 0.7;
                const size = 1 + near * 1.6;

                ctx.beginPath();
                ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`;
                ctx.arc(fx, fy, size, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = (t) => {
            if (!running) return;
            draw(t);
            raf = requestAnimationFrame(loop);
        };

        const onMove = (e) => {
            pointer.x = e.clientX;
            pointer.y = e.clientY;
        };
        const onLeave = () => {
            pointer.x = -9999;
            pointer.y = -9999;
        };

        build();

        if (reduce) {
            // settle instantly to the ordered grid, draw one static frame
            particles.forEach((p) => {
                p.x = p.tx;
                p.y = p.ty;
            });
            draw(0);
        } else {
            raf = requestAnimationFrame(loop);
            window.addEventListener("pointermove", onMove, { passive: true });
            window.addEventListener("pointerleave", onLeave);
        }

        const onResize = () => build();
        window.addEventListener("resize", onResize);

        const io = new IntersectionObserver(
            ([entry]) => {
                if (reduce) return;
                if (entry.isIntersecting && !running) {
                    running = true;
                    raf = requestAnimationFrame(loop);
                } else if (!entry.isIntersecting && running) {
                    running = false;
                    cancelAnimationFrame(raf);
                }
            },
            { threshold: 0 }
        );
        io.observe(canvas);

        const onVisibility = () => {
            if (reduce) return;
            if (document.hidden) {
                running = false;
                cancelAnimationFrame(raf);
            } else if (!running) {
                running = true;
                raf = requestAnimationFrame(loop);
            }
        };
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("resize", onResize);
            document.removeEventListener("visibilitychange", onVisibility);
            io.disconnect();
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                width: "100%",
                height: "100%",
                display: "block",
                maskImage:
                    "radial-gradient(120% 90% at 70% 30%, #000 35%, transparent 78%)",
                WebkitMaskImage:
                    "radial-gradient(120% 90% at 70% 30%, #000 35%, transparent 78%)",
            }}
        />
    );
}
