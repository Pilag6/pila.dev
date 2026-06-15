import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import "./signal.css";
import useLenis from "./useLenis.js";
import { work } from "./caseData.js";
import { profile } from "./siteData.js";
import SignalField from "./components/SignalField.jsx";
import SignalNav from "./components/SignalNav.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import Reveal from "./components/Reveal.jsx";
import SplitReveal from "./components/SplitReveal.jsx";
import Magnetic from "./components/Magnetic.jsx";
import Capabilities from "./components/Capabilities.jsx";
import Stack from "./components/Stack.jsx";
import Journey from "./components/Journey.jsx";
import Proof from "./components/Proof.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import cvFile from "@/assets/ezequielGonzalez.pdf";
import portrait from "@/assets/pila-hero.webp";

const PRINCIPLES = [
    {
        title: "Performance is a feature.",
        body: "Speed is respect for the user's time. I treat a performance budget like an API contract · measured, owned, and defended in review.",
    },
    {
        title: "Accessibility is the baseline, not the bonus.",
        body: "Keyboard, contrast, and semantics aren't a final pass. They shape the component from its first commit.",
    },
    {
        title: "Systems over screens.",
        body: "I build components that outlive the mockup · tokens, contracts, and patterns a team can move fast on for years.",
    },
    {
        title: "Taste is a skill, and it's debuggable.",
        body: "A 4px misalignment is a bug. I can tell you why an interface feels off, and then I fix it.",
    },
];

const POSITIONING_STATEMENT =
    "I turn ambiguous product ideas into resilient, performant frontends.";
const SCROLL_TEXT_INITIAL_LETTERS = 5;
const AIRPORT_BOARD_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.+%";

function ScrollRevealLetter({ char, index, progress, total }) {
    const start = (index - SCROLL_TEXT_INITIAL_LETTERS) / total;
    const end = Math.min(start + 0.18, 1);
    const opacity = useTransform(progress, [start, end], [0.24, 1]);
    const y = useTransform(progress, [start, end], [10, 0]);

    return (
        <motion.span className="sg-scroll-text__letter" style={{ opacity, y }} aria-hidden="true">
            {char}
        </motion.span>
    );
}

function ScrollTextReveal({ text }) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 76%", "end 36%"],
    });
    const words = text.split(" ");
    const letterCount = words.join("").length;
    let charIndex = 0;

    return (
        <p ref={ref} className="sg-h2 sg-scroll-text" style={{ maxWidth: "20ch" }}>
            <span className="sg-visually-hidden">{text}</span>
            <span className="sg-scroll-text__visual" aria-hidden="true">
                {words.map((word, wordIndex) => (
                    <Fragment key={`${word}-${wordIndex}`}>
                        <span className="sg-scroll-text__word">
                            {[...word].map((char) => {
                                const index = charIndex;
                                charIndex += 1;

                                return reduceMotion ? (
                                    <span key={`${char}-${index}`} className="sg-scroll-text__letter">
                                        {char}
                                    </span>
                                ) : (
                                    <ScrollRevealLetter
                                        key={`${char}-${index}`}
                                        char={char}
                                        index={index}
                                        progress={scrollYProgress}
                                        total={letterCount}
                                    />
                                );
                            })}
                        </span>
                        {wordIndex < words.length - 1 ? " " : null}
                    </Fragment>
                ))}
            </span>
        </p>
    );
}

function WorkList() {
    const previewRef = useRef(null);
    const [active, setActive] = useState(null);

    useEffect(() => {
        const move = (e) => {
            const el = previewRef.current;
            if (!el) return;
            el.style.left = `${e.clientX}px`;
            el.style.top = `${e.clientY}px`;
        };
        window.addEventListener("pointermove", move, { passive: true });
        return () => window.removeEventListener("pointermove", move);
    }, []);

    return (
        <>
            <div
                className="sg-work__preview"
                ref={previewRef}
                style={{
                    opacity: active ? 1 : 0,
                    transform: `translate(-50%, -50%) scale(${active ? 1 : 0.9})`,
                }}
            >
                {active && <img src={active} alt="" />}
            </div>

            <div>
                {work.map((p, i) => (
                    <Reveal key={p.slug} delay={i * 0.05}>
                        <Link
                            to={`/work/${p.slug}`}
                            className="sg-work__item"
                            data-cursor="view"
                            onMouseEnter={() => setActive(p.image)}
                            onMouseLeave={() => setActive(null)}
                        >
                            <div className="sg-work__row">
                                <div>
                                    <span className="sg-mono-label">{`0${i + 1} / ${p.year}`}</span>
                                    <h3 className="sg-work__title">{p.title}</h3>
                                    <div className="sg-work__meta">
                                        {p.tags.map((t) => (
                                            <span className="sg-tag" key={t}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                    <p
                                        className="sg-lead"
                                        style={{ marginTop: 16, fontSize: "1rem" }}
                                    >
                                        {p.outcome}
                                    </p>
                                </div>
                                <span className="sg-work__arrow">View case →</span>
                            </div>
                        </Link>
                    </Reveal>
                ))}
            </div>
        </>
    );
}

function AirportBoardValue({ value }) {
    const ref = useRef(null);
    const reduceMotion = useReducedMotion();
    const isInView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
    const [letters, setLetters] = useState(() => value.split(""));

    useEffect(() => {
        if (!isInView || reduceMotion) {
            setLetters(value.split(""));
            return undefined;
        }

        let frame = 0;
        const totalFrames = 18;
        const interval = window.setInterval(() => {
            frame += 1;
            setLetters(
                value.split("").map((char, index) => {
                    const lockFrame = totalFrames - (value.length - index) * 3;

                    if (frame >= lockFrame) return char;

                    return AIRPORT_BOARD_CHARS[
                        (frame * 7 + index * 11) % AIRPORT_BOARD_CHARS.length
                    ];
                }),
            );

            if (frame >= totalFrames) {
                window.clearInterval(interval);
                setLetters(value.split(""));
            }
        }, 55);

        return () => window.clearInterval(interval);
    }, [isInView, reduceMotion, value]);

    return (
        <>
            <span className="sg-visually-hidden">{value}</span>
            <div ref={ref} className="sg-airport-board" aria-hidden="true">
            {letters.map((letter, index) => (
                <span className="sg-airport-board__tile" key={index}>
                    {letter}
                </span>
            ))}
            </div>
        </>
    );
}

export default function SignalShowcase() {
    useLenis();

    return (
        <div className="signal-root">
            <ScrollProgress />
            <CustomCursor />
            <SignalNav cvHref={cvFile} />

            {/* ---------- HERO ---------- */}
            <header className="sg-hero">
                <div className="sg-hero__field">
                    <SignalField />
                </div>

                <div className="sg-shell sg-hero__inner">
                    <div className="sg-hero__text">
                        <Reveal y={0} trigger="mount">
                            <span className="sg-eyebrow sg-hero__eyebrow">
                                {profile.location}
                            </span>
                        </Reveal>
                        <Reveal y={0} delay={0.08} trigger="mount">
                            <p className="sg-hero__role">
                                {profile.role}
                                <span className="sg-hero__roleAccent">.</span>
                            </p>
                        </Reveal>
                        <h1 className="sg-display sg-hero__title">
                            <SplitReveal
                                lines={["I build interfaces", "that feel inevitable."]}
                                delay={0.15}
                                trigger="mount"
                            />
                        </h1>
                        <Reveal delay={0.5} trigger="mount">
                            <p className="sg-lead sg-hero__lead">
                            Fourteen years. <strong>Multiple frameworks, one way of working.</strong> From large-scale products to zero-to-one startups, I own the frontend <strong>end-to-end: architecture, performance, accessibility</strong> and the <strong>design systems</strong> behind them.
                            </p>
                        </Reveal>
                        <div className="sg-hero__cta">
                            <Reveal delay={0.6} trigger="mount">
                                <Magnetic>
                                    <a href="#work" className="sg-btn sg-btn--solid" data-cursor="view">
                                        View selected work
                                    </a>
                                </Magnetic>
                            </Reveal>
                            <Reveal delay={0.66} trigger="mount">
                                <Magnetic>
                                    <a href="#contact" className="sg-btn" data-cursor="view">
                                        Start a conversation
                                    </a>
                                </Magnetic>
                            </Reveal>
                            <Reveal delay={0.72} trigger="mount">
                                <Magnetic>
                                    <a href={cvFile} download className="sg-btn" data-cursor="view">
                                        Download CV
                                    </a>
                                </Magnetic>
                            </Reveal>
                        </div>

                        {/* "previously at" wordmark strip */}
                        <Reveal delay={0.8} trigger="mount">
                            <div className="sg-hero__prev">
                                <span className="sg-mono-label">Previously</span>
                                <div className="sg-hero__prevList">
                                    {profile.previously.map((c) => (
                                        <span className="sg-hero__prevItem" key={c}>
                                            {c}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal className="sg-hero__portrait" delay={0.3} y={0} trigger="mount">
                        <img
                            src={portrait}
                            alt="Portrait of Ezequiel “Pila” Gonzalez"
                            width="760"
                            height="950"
                        />
                    </Reveal>
                </div>

                <div className="sg-hero__scroll">
                    <div className="sg-hero__scroll-line" />
                    <span className="sg-mono-label">scroll</span>
                </div>
            </header>

            {/* ---------- POSITIONING ---------- */}
            <section className="sg-section">
                <div className="sg-shell">
                    <ScrollTextReveal text={POSITIONING_STATEMENT} />
                    <div className="sg-facts" style={{ marginTop: "var(--sp-10)" }}>
                        {[
                            { n: "14+", l: "Years shipping" },
                            { n: "30%", l: "Faster (Skyscanner)" },
                            { n: "1.2s", l: "LCP budget" },
                            { n: "AA", l: "Accessibility baseline" },
                        ].map((f, i) => (
                            <Reveal key={f.l} delay={i * 0.08}>
                                <div>
                                    <div className="sg-fact__num">
                                        <AirportBoardValue value={f.n} />
                                    </div>
                                    <div className="sg-fact__label sg-mono-label">{f.l}</div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- PHILOSOPHY ---------- */}
            <section className="sg-section" id="philosophy">
                <div className="sg-shell">
                    <Reveal>
                        <span className="sg-eyebrow">How I think</span>
                    </Reveal>
                    <div style={{ marginTop: "var(--sp-8)" }}>
                        {PRINCIPLES.map((p, i) => (
                            <Reveal key={p.title} delay={i * 0.04}>
                                <div className="sg-principle">
                                    <div className="sg-principle__idx">
                                        {String(i + 1).padStart(2, "0")}
                                    </div>
                                    <div>
                                        <h3 className="sg-principle__title">{p.title}</h3>
                                        <p className="sg-principle__body">{p.body}</p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- SELECTED WORK ---------- */}
            <section className="sg-section" id="work">
                <div className="sg-shell">
                    <Reveal>
                        <span className="sg-eyebrow">Selected work</span>
                    </Reveal>
                    <Reveal delay={0.05}>
                        <p className="sg-lead" style={{ margin: "var(--sp-6) 0 var(--sp-10)" }}>
                            A few products worth talking about · the ones that show how I think.
                        </p>
                    </Reveal>
                    <WorkList />
                </div>
            </section>

            {/* ---------- CAPABILITIES ---------- */}
            <Capabilities />

            {/* ---------- STACK ---------- */}
            <Stack />

            {/* ---------- JOURNEY ---------- */}
            <Journey />

            {/* ---------- PROOF ---------- */}
            <Proof />

            {/* ---------- CONTACT ---------- */}
            <section className="sg-section" id="contact">
                <div className="sg-shell">
                    <Reveal>
                        <span className="sg-eyebrow">Contact</span>
                    </Reveal>
                    <h2 className="sg-contact__title" style={{ marginTop: "var(--sp-6)" }}>
                        <SplitReveal lines={["Let's build", "something precise."]} />
                    </h2>
                    <Reveal delay={0.2}>
                        <a
                            href={`mailto:${profile.email}`}
                            className="sg-contact__email sg-h2"
                            data-cursor="view"
                        >
                            {profile.email}
                        </a>
                    </Reveal>
                    <div className="sg-hero__cta">
                        <Reveal delay={0.3}>
                            <Magnetic>
                                <a href={cvFile} download className="sg-btn sg-btn--solid" data-cursor="view">
                                    Download CV
                                </a>
                            </Magnetic>
                        </Reveal>
                    </div>
                    <Reveal delay={0.4}>
                        <div className="sg-contact__links">
                            <a href={profile.github} target="_blank" rel="noreferrer" data-cursor="view">
                                {profile.githubLabel}
                            </a>
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" data-cursor="view">
                                {profile.linkedinLabel}
                            </a>
                            <a href={profile.website} target="_blank" rel="noreferrer" data-cursor="view">
                                {profile.websiteLabel}
                            </a>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ---------- FOOTER / COLOPHON ---------- */}
            <footer className="sg-footer">
                <div className="sg-shell sg-footer__row">
                    <span className="sg-mono-label">
                        Ezequiel Gonzalez · Built with React · Framer Motion · GSAP · Lenis
                    </span>
                    <span className="sg-mono-label">
                        Berlin · AA · reduced-motion aware · {new Date().getFullYear()}
                    </span>
                </div>
            </footer>
        </div>
    );
}
