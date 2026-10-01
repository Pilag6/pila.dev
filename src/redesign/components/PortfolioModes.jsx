import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCode, FaUserTie, FaXmark } from "react-icons/fa6";
import { FaMicrochip } from "react-icons/fa";

const RECRUITER_SIGNALS = [
    { value: "14+", label: "years shipping" },
    { value: "React", label: "product interfaces" },
    { value: "Vue", label: "frontend systems" },
    { value: "TS", label: "default language" },
];

const ENGINEERING_AREAS = [
    {
        title: "Frontend boundaries",
        body: "I keep presentation, server state, transport, domain logic, and persistence responsibilities explicit instead of letting frameworks become the architecture.",
        tags: ["React", "Vue", "Astro", "TypeScript"],
    },
    {
        title: "Systems over screens",
        body: "Reusable component APIs, design tokens, route contracts, content schemas, and shared primitives are part of the product, not cleanup work after launch.",
        tags: ["Design systems", "Contracts", "Schemas"],
    },
    {
        title: "Quality at the boundary",
        body: "Tests cover domain logic, integration points, and generated output. Accessibility and reduced motion are treated as implementation constraints from the start.",
        tags: ["Testing", "A11y", "Output checks"],
    },
    {
        title: "Runtime restraint",
        body: "I prefer the smallest runtime that fits the product: static output where possible, local-first state where useful, and realtime only where a stream is actually needed.",
        tags: ["Performance", "Static-first", "Local-first"],
    },
];

function ModeButton({ active, icon: Icon, children, onClick, controls, pressed }) {
    return (
        <button
            type="button"
            className="sg-mode-dock__button"
            data-active={active}
            aria-pressed={pressed}
            aria-controls={controls}
            onClick={onClick}
        >
            <Icon aria-hidden="true" />
            <span>{children}</span>
        </button>
    );
}

function RecruiterPanel({ work, profile, cvHref, onClose }) {
    return (
        <>
            <span className="sg-eyebrow">60-second view</span>
            <h2 className="sg-mode-panel__title">The shortest path to the signal.</h2>
            <p className="sg-mode-panel__lead">
                Senior / Lead Frontend Engineer in Berlin with 14 years building product interfaces,
                frontend systems, design systems, and performance-sensitive experiences.
            </p>

            <div className="sg-mode-panel__signals">
                {RECRUITER_SIGNALS.map((signal) => (
                    <div className="sg-mode-panel__signal" key={signal.label}>
                        <strong>{signal.value}</strong>
                        <span>{signal.label}</span>
                    </div>
                ))}
            </div>

            <div className="sg-mode-panel__section">
                <span className="sg-mono-label">Strongest evidence</span>
                <div className="sg-mode-panel__projects">
                    {work.slice(0, 3).map((project) => (
                        <Link
                            to={`/work/${project.slug}`}
                            className="sg-mode-project"
                            key={project.slug}
                            onClick={onClose}
                        >
                            <div>
                                <strong>{project.title}</strong>
                                <p>{project.outcome}</p>
                            </div>
                            <span>View case ↗</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="sg-mode-panel__section">
                <span className="sg-mono-label">What I can own</span>
                <div className="sg-mode-panel__chips">
                    {[
                        "Frontend architecture",
                        "Complex product UI",
                        "Design systems",
                        "Performance",
                        "Accessibility",
                        "AI interfaces",
                    ].map((item) => (
                        <span className="sg-tag" key={item}>{item}</span>
                    ))}
                </div>
            </div>

            <div className="sg-mode-panel__actions">
                <a className="sg-btn sg-btn--solid" href={cvHref} download>
                    Download CV
                </a>
                <a className="sg-btn" href={`mailto:${profile.email}`}>
                    Email me
                </a>
                <a className="sg-btn" href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                </a>
            </div>
        </>
    );
}

function EngineeringPanel({ onClose }) {
    return (
        <>
            <span className="sg-eyebrow">Engineering view</span>
            <h2 className="sg-mode-panel__title">How I turn product complexity into boundaries.</h2>
            <p className="sg-mode-panel__lead">
                This view skips the visual portfolio pitch and goes straight to the engineering
                patterns behind the work.
            </p>

            <div className="sg-mode-engineering">
                {ENGINEERING_AREAS.map((area, index) => (
                    <article className="sg-mode-engineering__card" key={area.title}>
                        <span className="sg-mono-label">{String(index + 1).padStart(2, "0")}</span>
                        <h3>{area.title}</h3>
                        <p>{area.body}</p>
                        <div className="sg-mode-panel__chips">
                            {area.tags.map((tag) => <span className="sg-tag" key={tag}>{tag}</span>)}
                        </div>
                    </article>
                ))}
            </div>

            <div className="sg-mode-panel__section">
                <span className="sg-mono-label">Architecture evidence</span>
                <div className="sg-mode-panel__projects">
                    <Link to="/work/hutlify" className="sg-mode-project" onClick={onClose}>
                        <div>
                            <strong>Hutlify</strong>
                            <p>Vue 3, tRPC, modular monolith, repository ports, SQLite, WebSocket logs.</p>
                        </div>
                        <span>Architecture case ↗</span>
                    </Link>
                    <Link to="/work/the-berlin-around" className="sg-mode-project" onClick={onClose}>
                        <div>
                            <strong>The Berlin Around</strong>
                            <p>Typed content graph, build-time validation, route inventory, CI, output checks.</p>
                        </div>
                        <span>Systems case ↗</span>
                    </Link>
                </div>
            </div>

            <div className="sg-mode-panel__note">
                <FaCode aria-hidden="true" />
                <p>
                    Turn on <strong>Inspect</strong> from the dock to see technical notes attached
                    directly to the live interface.
                </p>
            </div>
        </>
    );
}

export default function PortfolioModes({ inspectActive, onInspectChange, profile, cvHref, work }) {
    const [panel, setPanel] = useState(null);
    const panelRef = useRef(null);

    useEffect(() => {
        if (!panel) return undefined;

        const previousBodyOverflow = document.body.style.overflow;
        const previousHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        window.__signalLenis?.stop();

        const onKeyDown = (event) => {
            if (event.key === "Escape") setPanel(null);
        };

        window.addEventListener("keydown", onKeyDown);
        requestAnimationFrame(() => panelRef.current?.focus());

        return () => {
            document.body.style.overflow = previousBodyOverflow;
            document.documentElement.style.overflow = previousHtmlOverflow;
            window.__signalLenis?.start();
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [panel]);

    return (
        <>
            <div className="sg-mode-dock" aria-label="Portfolio viewing modes">
                <span className="sg-mode-dock__label">View as</span>
                <ModeButton
                    icon={FaCode}
                    active={inspectActive}
                    pressed={inspectActive}
                    onClick={() => onInspectChange(!inspectActive)}
                >
                    Inspect
                </ModeButton>
                <ModeButton
                    icon={FaUserTie}
                    active={panel === "recruiter"}
                    pressed={panel === "recruiter"}
                    controls="portfolio-mode-panel"
                    onClick={() => setPanel(panel === "recruiter" ? null : "recruiter")}
                >
                    Recruiter
                </ModeButton>
                <ModeButton
                    icon={FaMicrochip}
                    active={panel === "engineering"}
                    pressed={panel === "engineering"}
                    controls="portfolio-mode-panel"
                    onClick={() => setPanel(panel === "engineering" ? null : "engineering")}
                >
                    Engineering
                </ModeButton>
            </div>

            {panel ? (
                <div className="sg-mode-overlay" role="presentation" onMouseDown={() => setPanel(null)}>
                    <section
                        id="portfolio-mode-panel"
                        className="sg-mode-panel"
                        role="dialog"
                        aria-modal="true"
                        aria-label={panel === "recruiter" ? "Recruiter view" : "Engineering view"}
                        tabIndex={-1}
                        ref={panelRef}
                        data-lenis-prevent
                        data-lenis-prevent-wheel
                        data-lenis-prevent-touch
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="sg-mode-panel__close"
                            aria-label="Close view"
                            onClick={() => setPanel(null)}
                        >
                            <FaXmark aria-hidden="true" />
                        </button>

                        {panel === "recruiter" ? (
                            <RecruiterPanel
                                work={work}
                                profile={profile}
                                cvHref={cvHref}
                                onClose={() => setPanel(null)}
                            />
                        ) : (
                            <EngineeringPanel onClose={() => setPanel(null)} />
                        )}
                    </section>
                </div>
            ) : null}
        </>
    );
}
