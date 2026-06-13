import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Magnetic from "./Magnetic.jsx";

/**
 * SignalNav — minimal fixed bar that hides on scroll-down, reveals on scroll-up.
 * Uses mix-blend-mode: difference so it stays legible over any section.
 */
export default function SignalNav({ cvHref }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav className="sg-nav" data-scrolled={scrolled}>
            <Link
                to="/signal"
                className="sg-nav__brand"
                data-cursor="view"
                aria-label="Ezequiel Gonzalez — home"
            >
                <span className="sg-nav__brandShort">EG</span>
                <span className="sg-nav__brandFull">Ezequiel&nbsp;Gonzalez</span>
                <span className="sg-nav__brandDot">.</span>
            </Link>
            <div className="sg-nav__links">
                <a href="#work">Work</a>
                <a href="#philosophy">Philosophy</a>
                <a href="#contact">Contact</a>
                <Magnetic className="sg-nav__cta">
                    <a href={cvHref} className="sg-btn" download data-cursor="view">
                        Download CV
                    </a>
                </Magnetic>
            </div>
        </nav>
    );
}
