import { testimonials, proofMetrics } from "../siteData.js";
import Reveal from "./Reveal.jsx";
import MetricCounter from "./MetricCounter.jsx";
import InspectNote from "./InspectNote.jsx";

export default function Proof({ inspectActive = false }) {
    return (
        <section className="sg-section" id="proof">
            <div className="sg-shell">
                <Reveal>
                    <span className="sg-eyebrow">Proof</span>
                </Reveal>
                <Reveal delay={0.05}>
                    <p className="sg-h2" style={{ maxWidth: "22ch", marginTop: "var(--sp-6)" }}>
                        The work speaks. So do the people I’ve built it with.
                    </p>
                </Reveal>

                <div className="sg-quotes">
                    {testimonials.map((t, i) => (
                        <Reveal
                            key={t.name + t.org}
                            delay={i * 0.08}
                            className="sg-quote"
                            data-inspect-label="testimonials.map · index-staggered Reveal"
                        >
                            <div className="sg-quote__mark" aria-hidden="true">
                                “
                            </div>
                            <p className="sg-quote__text">{t.quote}</p>
                            <div className="sg-quote__by">
                                {t.name} · {t.org}
                            </div>
                        </Reveal>
                    ))}
                </div>

                <div className="sg-proof__metrics" data-inspect-label="Authored proofMetrics → MetricCounter props">
                    {proofMetrics.map((m) => (
                        <MetricCounter key={m.label} {...m} />
                    ))}
                </div>
                {inspectActive ? (
                    <InspectNote
                        title="Authored targets + count-up state"
                        placement="proof"
                        side="left"
                        items={[
                            "siteData.js supplies quotes and metric targets",
                            "useInView starts a requestAnimationFrame count-up",
                            "MetricCounter formats decimals and suffixes",
                            "Reduced motion shows final values immediately",
                        ]}
                    />
                ) : null}
            </div>
        </section>
    );
}
