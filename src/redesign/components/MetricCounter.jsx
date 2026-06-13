import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * MetricCounter — animated count-up to a target value when scrolled into view.
 * Reduced-motion → shows the final value immediately.
 */
export default function MetricCounter({ value, suffix = "", decimals = 0, label, delta }) {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-20%" });
    const [display, setDisplay] = useState(reduce ? value : 0);

    useEffect(() => {
        if (!inView || reduce) {
            if (reduce) setDisplay(value);
            return;
        }
        let raf = 0;
        const start = performance.now();
        const duration = 1400;
        const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setDisplay(value * eased);
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [inView, reduce, value]);

    return (
        <div className="sg-metric" ref={ref}>
            <div className="sg-metric__value">
                {display.toFixed(decimals)}
                {suffix}
            </div>
            <div className="sg-mono-label" style={{ marginTop: 8 }}>
                {label}
            </div>
            {delta && <div className="sg-metric__delta">{delta}</div>}
        </div>
    );
}
