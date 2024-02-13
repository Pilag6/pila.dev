import "./HeroImg.css"
import pilaHero from "../../assets/pila-hero.avif";

const HeroImg = () => {
    return (
        <div className="hero-img">
            <img className="profile-img" src={pilaHero} alt="" />
            <img
                className="img-waves"
                src="./assets/draw-hero-wawe.svg"
                alt=""
            />
        </div>
    );
};

export default HeroImg;
