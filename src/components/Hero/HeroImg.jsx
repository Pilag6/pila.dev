import "./HeroImg.css"
import pilaHero from "../../assets/pila-hero.webp";
import draqHeroWawe from "../../assets/draw-hero-wawe.svg";

const HeroImg = () => {
    return (
        <div className="hero-img">
            <img className="profile-img" src={pilaHero} alt="" loading="lazy" />
            <img
                className="img-waves"
                src={draqHeroWawe}
                alt=""
            />
        </div>
    );
};

export default HeroImg;
