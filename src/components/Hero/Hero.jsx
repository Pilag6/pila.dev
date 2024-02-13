import HeroBtns from "./HeroBtns.jsx";
import HeroImg from "./HeroImg.jsx";
import HeroText from "./HeroText.jsx";
import "./Hero.css";

const Hero = () => {
    return (
        <section className="hero">
            <HeroText />
            <HeroBtns />
            <HeroImg />
        </section>
    );
};

export default Hero;
