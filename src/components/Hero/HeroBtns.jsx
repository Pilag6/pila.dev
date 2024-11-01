import "./HeroBtns.css"
import drawHeroArrow from "../../assets/draw-hero-arrow.svg";
import drawHeroCircle from "../../assets/draw-hero-circle.svg";
import Curriculum from "../../assets/ezequielGonzalez.pdf";

const HeroBtns = () => {
    return (
        <div className="hero-btn">
            <a
                className="btn-curriculum"
                href={Curriculum}
                target="_blank"
                rel="noreferrer"
                aria-label="Go to download My Curriculum"
            >
                MY CURRICULUM
            </a>

            <a
                className="btn-projects"
                href="#projects"
                aria-label="Go to My Projects"
            >
                MY PROJECTS
            </a>

            <div className="hero-arrow-1">
                <img src={drawHeroArrow} alt="Draw Hero Arrow" />
            </div>

            <img
                className="hero-circle"
                src={drawHeroCircle}
                alt=""
            />
        </div>
    );
};

export default HeroBtns;
