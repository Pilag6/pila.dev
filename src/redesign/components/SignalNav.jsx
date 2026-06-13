import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Magnetic from "./Magnetic.jsx";

const NAV_LINKS = [
    { href: "#work", label: "Work" },
    { href: "#philosophy", label: "Philosophy" },
    { href: "#journey", label: "Journey" },
    { href: "#contact", label: "Contact" },
];

/**
 * SignalNav — fixed header, always visible. Desktop shows inline links;
 * mobile uses a hamburger menu with a full-screen panel.
 */
export default function SignalNav({ cvHref }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <nav className="sg-nav" data-scrolled={scrolled}>
                <Link
                    to="/"
                    className="sg-nav__brand"
                    data-cursor="view"
                    aria-label="Ezequiel Gonzalez — home"
                    onClick={closeMenu}
                >
                    Ezequiel Gonzalez
                    <span className="sg-nav__brandDot">.</span>
                </Link>

                <div className="sg-nav__links">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} data-cursor="view">
                            {link.label}
                        </a>
                    ))}
                    <Magnetic className="sg-nav__cta">
                        <a href={cvHref} className="sg-btn" download data-cursor="view">
                            Download CV
                        </a>
                    </Magnetic>
                </div>

                <button
                    type="button"
                    className="sg-nav__toggle"
                    aria-expanded={menuOpen}
                    aria-controls="sg-nav-menu"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    onClick={() => setMenuOpen((open) => !open)}
                >
                    <span className="sg-nav__toggleIcon" data-open={menuOpen} aria-hidden="true" />
                </button>
            </nav>

            <div
                id="sg-nav-menu"
                className="sg-nav__menu"
                data-open={menuOpen}
                aria-hidden={!menuOpen}
            >
                <div className="sg-nav__menuInner">
                    {NAV_LINKS.map((link, i) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="sg-nav__menuLink"
                            data-cursor="view"
                            style={{ transitionDelay: menuOpen ? `${i * 50}ms` : "0ms" }}
                            onClick={closeMenu}
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href={cvHref}
                        className="sg-btn sg-btn--solid sg-nav__menuCta"
                        download
                        onClick={closeMenu}
                    >
                        Download CV
                    </a>
                </div>
            </div>
        </>
    );
}
