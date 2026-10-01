import { capabilities } from "../siteData.js";
import Reveal from "./Reveal.jsx";
import InspectNote from "./InspectNote.jsx";

export default function Capabilities({ inspectActive = false }) {
    return (
        <section className="sg-section" id="capabilities">
            <div className="sg-shell">
                <Reveal>
                    <span className="sg-eyebrow">Capabilities</span>
                </Reveal>
                <Reveal delay={0.05}>
                    <p className="sg-h2" style={{ maxWidth: "18ch", marginTop: "var(--sp-6)" }}>
                    The thinking that shapes better products.
                    </p>
                </Reveal>

                <div className="sg-cap__grid">
                    {capabilities.map((cap, i) => (
                        <Reveal
                            key={cap.id}
                            delay={(i % 3) * 0.06}
                            className="sg-cap"
                            data-inspect-label={`Mapped card · key=${cap.id}`}
                        >
                            <span className="sg-cap__idx">{String(i + 1).padStart(2, "0")}</span>
                            <h3 className="sg-cap__title">{cap.title}</h3>
                            <p className="sg-cap__body">{cap.body}</p>
                            <div className="sg-cap__items">
                                {cap.items.map((it) => (
                                    <span className="sg-tag" key={it}>
                                        {it}
                                    </span>
                                ))}
                            </div>
                        </Reveal>
                    ))}
                </div>
                {inspectActive ? (
                    <InspectNote
                        title="Data-mapped auto-fit grid"
                        placement="capabilities"
                        items={[
                            "capabilities comes from siteData.js",
                            "cap.id keys each card; cap.items maps tags",
                            "CSS auto-fit uses minmax(290px, 1fr)",
                            "Reveal delay repeats every three cards",
                        ]}
                    />
                ) : null}
            </div>
        </section>
    );
}
