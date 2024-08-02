import drawX from "../../assets/drawX.svg";
import drawCurvyArrow from "../../assets/draw-curvyArrow-1.svg";
import "./NavTop.css";

const NavTop = () => {
    return (
        <nav className="nav-top">
            <img
                className="nav-top__x"
                src={drawX}
                alt="Draw Navbar Decoration"
            />

            <div className="nav-top__list">
                <a href="#projects" aria-label="Projects Button Menu">
                    Projects
                </a>
                <a
                    className="nav-about"
                    href="#about"
                    aria-label="About Button Menu"
                >
                    About
                </a>
                <a
                    className="nav-blog"
                    href="https://pilagonzalez.com/"
                    aria-label="Blog Button Menu"
                    target="_blank"
                    rel="noreferrer"
                >
                    Blog
                </a>

                <div className="nav-top__curvyArrow">
                    <img
                        src={drawCurvyArrow}
                        alt="Draw Navbar Decoration"
                    />
                </div>
            </div>
        </nav>
    );
};

export default NavTop;
