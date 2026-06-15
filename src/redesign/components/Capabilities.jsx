import { capabilities } from "../siteData.js";
import Reveal from "./Reveal.jsx";

export default function Capabilities() {
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
                        <Reveal key={cap.id} delay={(i % 3) * 0.06} className="sg-cap">
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
            </div>
        </section>
    );
}
