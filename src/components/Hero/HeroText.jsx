import "./HeroText.css"
import drawHeroText from "../../assets/draw-hero-text.svg";
import drawHero1 from "../../assets/draw-hero-1.svg";
import drawHeroStars from "../../assets/draw-hero-stars.svg";

const HeroText = () => {
    return (
        <div className="hero-text">
            <div className="hero-frontend">
                <h1>
                    Full-Stack <br />
                    Developer
                </h1>
                <img
                    className="h1-decoration"
                    src={drawHeroText}
                    alt=""
                />
                <img
                    className="hero-main-draw"
                    src={drawHero1}
                    alt=""
                />
            </div>

            <div className="hero-designer">
                <p>UX/UI Designer</p>
                <img
                    className="hero-stars"
                    src={drawHeroStars}
                    alt="Draw Hero Stars Decoration"
                />
            </div>
        </div>
    );
};

export default HeroText;
