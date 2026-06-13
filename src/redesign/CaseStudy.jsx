import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./signal.css";
import useLenis from "./useLenis.js";
import { caseStudies, work } from "./caseData.js";
import SignalNav from "./components/SignalNav.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Reveal from "./components/Reveal.jsx";
import SplitReveal from "./components/SplitReveal.jsx";
import Magnetic from "./components/Magnetic.jsx";
import MetricCounter from "./components/MetricCounter.jsx";
import ArchitectureDiagram from "./components/ArchitectureDiagram.jsx";
import cvFile from "@/assets/ezequielGonzalez.pdf";

// minimal markdown-ish: **bold** → <strong>
function renderText(text) {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
            <strong key={i}>{part.slice(2, -2)}</strong>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

export default function CaseStudy() {
    const { slug } = useParams();
    const data = caseStudies[slug];
    useLenis();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!data) {
        return (
            <div className="signal-root">
                <div className="sg-shell sg-section">
                    <p className="sg-h2">This route didn’t render.</p>
                    <Link to="/" className="sg-btn" style={{ marginTop: 24 }}>
                        ← Back to work
                    </Link>
                </div>
            </div>
        );
    }

    const next = work.find((w) => w.slug !== slug);

    return (
        <div className="signal-root">
            <CustomCursor />
            <SignalNav cvHref={cvFile} />

            {/* ---------- HERO ---------- */}
            <header className="sg-shell sg-case__hero">
                <Reveal y={0} trigger="mount">
                    <span className="sg-eyebrow">{data.eyebrow}</span>
                </Reveal>
                <h1 className="sg-display sg-case__title">
                    <SplitReveal lines={[data.title]} trigger="mount" />
                </h1>
                <p className="sg-case__problem">{data.problem}</p>

                <div className="sg-case__metaGrid">
                    {Object.entries(data.meta).map(([k, v], i) => (
                        <Reveal key={k} delay={i * 0.06} className="sg-case__metaItem">
                            <span className="sg-mono-label">{k}</span>
                            <p>{v}</p>
                        </Reveal>
                    ))}
                </div>
            </header>

            {/* ---------- BLOCKS ---------- */}
            <main className="sg-shell">
                {data.blocks.map((block) => (
                    <section className="sg-case__block" key={block.heading}>
                        <Reveal as="h3" className="sg-h2" y={0}>
                            {block.heading}
                        </Reveal>
                        <div className="sg-case__prose">
                            {block.body?.map((p, i) => (
                                <Reveal key={i} delay={i * 0.04}>
                                    <p>{renderText(p)}</p>
                                </Reveal>
                            ))}

                            {block.list && (
                                <Reveal>
                                    <ul>
                                        {block.list.map((li) => (
                                            <li key={li}>{li}</li>
                                        ))}
                                    </ul>
                                </Reveal>
                            )}

                            {block.metrics && (
                                <div className="sg-metrics">
                                    {block.metrics.map((m) => (
                                        <MetricCounter key={m.label} {...m} />
                                    ))}
                                </div>
                            )}

                            {block.compare && (
                                <div className="sg-compare">
                                    {["before", "after"].map((side) => {
                                        const panel = block.compare[side];
                                        const isExternalView = side === "before";
                                        return (
                                            <Reveal
                                                key={side}
                                                delay={side === "after" ? 0.08 : 0}
                                            >
                                                <Link
                                                    to={panel.href}
                                                    className="sg-compare__card"
                                                    data-side={side}
                                                    data-cursor="view"
                                                >
                                                    <span className="sg-compare__tag sg-mono-label">
                                                        {side}
                                                    </span>
                                                    <div className="sg-compare__media">
                                                        {panel.image ? (
                                                            <img src={panel.image} alt={panel.label} loading="lazy" />
                                                        ) : (
                                                            <div className="sg-compare__live" aria-hidden="true">
                                                                <span className="sg-compare__brand">
                                                                    Ezequiel Gonzalez
                                                                    <span className="sg-compare__dot" />
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="sg-compare__meta">
                                                        <span className="sg-compare__label">{panel.label}</span>
                                                        <span className="sg-compare__sub">{panel.sub}</span>
                                                        <span className="sg-compare__cta">
                                                            {panel.cta}{" "}
                                                            {isExternalView ? "→" : "↗"}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </Reveal>
                                        );
                                    })}
                                </div>
                            )}

                            {block.diagram && <ArchitectureDiagram />}
                        </div>
                    </section>
                ))}
            </main>

            {/* ---------- NEXT ---------- */}
            {next && (
                <section className="sg-section">
                    <div className="sg-shell">
                        <span className="sg-mono-label">Next case</span>
                        <Link
                            to={`/work/${next.slug}`}
                            className="sg-work__item"
                            data-cursor="view"
                            style={{ borderBottom: "1px solid var(--sg-line)" }}
                        >
                            <div className="sg-work__row">
                                <h3 className="sg-work__title">{next.title}</h3>
                                <span className="sg-work__arrow">View case →</span>
                            </div>
                        </Link>
                        <div style={{ marginTop: 40 }}>
                            <Magnetic>
                                <Link to="/#work" className="sg-btn" data-cursor="view">
                                    ← All work
                                </Link>
                            </Magnetic>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
