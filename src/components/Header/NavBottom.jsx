import drawUnderline from "../../assets/draw-underline.svg";
import "./NavBottom.css";

const NavBottom = () => {
    return (
        <nav className="nav-bottom">
            {/* <!-- LOGO --> */}
            <div className="nav-bottom__logo">
                <h2>Pila Gonzalez</h2>
                <img className="logo__underline" src={drawUnderline} alt="" />
            </div>

            {/* <!-- NAV SOCIAL --> */}
            <div className="nav-bottom__social">
                {/* <!-- GITHUB --> */}
                <div className="social--github social">
                    <a
                        href="https://github.com/Pilag6"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Github Social Icon in the Menu"
                    >
                        <i className="fa-brands fa-square-github"></i>
                    </a>
                </div>
                {/* <!-- LINKEDIN --> */}
                <div className="social--linkedin social">
                    <a
                        href="https://www.linkedin.com/in/pila-gonzalez/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Linkedin Social Icon in the Menu"
                    >
                        <i className="fa-brands fa-linkedin"></i>
                    </a>
                </div>
                {/* <!-- EMAIL --> */}
                <div className="social--email social">
                    <a
                        href="mailto:pilag6@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Email Social Icon in the Menu"
                    >
                        <i className="fa-solid fa-envelope"></i>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default NavBottom;
