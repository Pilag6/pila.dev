import NavTop from "./NavTop.jsx";
import NavBottom from "./NavBottom.jsx";
import "./Header.css";

const Header = () => {
    return (
        <header className="site-header">
            <NavTop />

            <NavBottom />
        </header>
    );
};

export default Header;
