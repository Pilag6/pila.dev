import "./AboutSection.css";

import drawAbout from "../../assets/draw-about.svg";

import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const AboutSection = () => {
    return (
        <section className="about" id="about">
            <div className="about-logo">
                <h2>About</h2>
            </div>

            <div className="about-content">
                {/* <!-- About Content Left --> */}
                <div className="about-content__left">
                    <img src={drawAbout} alt="" />
                </div>

                {/* <!-- About Content Right --> */}
                <div className="about-content__right">
                    <div className="about-text">
                        <p>
                            Hi, I'm Ezequiel "Pila" Gonzalez, a professional
                            Frontend UX/UI Developer based in Berlin, with +10
                            years of experience.
                        </p>
                        <p>
                            After working as a consultant for entrepreneurs, I
                            embarked on a journey around the world, visiting 45+
                            countries and working in tourism. For over a decade,
                            I've delved into Content Creation, Web Development,
                            and Digital Marketing, with a focus on copywriting,
                            social media, design, and SEO.
                        </p>

                        <p>
                            I've authored 300+ articles and published 3 books in
                            Spanish. Now, I reside in Berlin with my wife and my daughter, and am eager to assist with your Web
                            Development and Design projects.
                        </p>

                        <p>
                            Feel free to reach out. I look forward to
                            connecting. See you on the other side.
                        </p>
                    </div>
                    <div className="about-btn">
                        <a
                            href="https://github.com/Pilag6"
                            target="_blank"
                            aria-label="Go to my Github"
                            rel="noreferrer"
                        >
                            <FaGithubSquare className="about-icons"/>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/pila-gonzalez"
                            target="_blank"
                            aria-label="Go to my Linkedin"
                            rel="noreferrer"
                        >
                            <FaLinkedin className="about-icons"/>
                        </a>
                        <a
                            href="mailto:pilag6@gmail.com"
                            target="_blank"
                            aria-label="Go to my Email"
                            rel="noreferrer"
                        >
                            <FaEnvelope className="about-icons"/>
                        </a>
                        <a
                            href="https://twitter.com/PilaGonzalezOk"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaSquareXTwitter className="about-icons"/>
                        </a>
                    </div>
                    <div className="berlin-text">
                        <h3>BERLIN, DE</h3>
                    </div>
                    <img className="rulo" src="./assets/rulo.svg" alt="" />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
