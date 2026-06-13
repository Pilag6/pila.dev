import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { journey } from "../siteData.js";
import Reveal from "./Reveal.jsx";

/**
 * Journey — scroll-driven career timeline. The accent line draws itself as the
 * section passes through the viewport. Reduced-motion → full static line.
 */
export default function Journey() {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 70%", "end 60%"],
    });
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

    return (
        <section className="sg-section" id="journey">
            <div className="sg-shell">
                <Reveal>
                    <span className="sg-eyebrow">The journey</span>
                </Reveal>
                <Reveal delay={0.05}>
                    <p className="sg-h2" style={{ maxWidth: "22ch", marginTop: "var(--sp-6)" }}>
                        +14 years of earning the word “senior.”
                    </p>
                </Reveal>

                <div className="sg-journey" ref={ref}>
                    <div className="sg-journey__track" />
                    <motion.div
                        className="sg-journey__progress"
                        style={{ scaleY: reduce ? 1 : scaleY }}
                    />
                    {journey.map((j) => (
                        <Reveal key={j.year + j.org} className="sg-journey__item">
                            <div className="sg-journey__dot" />
                            <div className="sg-journey__year">{j.year}</div>
                            <div>
                                <h3 className="sg-journey__role">{j.role}</h3>
                                <div className="sg-journey__org">{j.org}</div>
                                <p className="sg-journey__note">{j.note}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
