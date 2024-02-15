import "./AboutSection.css";

import drawAbout from "../../assets/draw-about.svg";
import rulo from "../../assets/rulo.svg";

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

                    <div className="about-short">
                        <h3>50 WORDS <span>(OR LESS)</span></h3>
                        <p>I am a versatile <strong>Frontend UX/UI Developer</strong> with a creative flair. My passion lies in crafting impactful websites, blending design aesthetics with a digital mindset that help brands make an impact and get the Next Level through immersive user experiences.</p>
                    </div>
                </div>

                {/* <!-- About Content Right --> */}
                <div className="about-content__right">
                    <div className="about-text">
                        <p>
                            Hi, I&apos;m <strong>Ezequiel &quot;Pila&quot; Gonzalez</strong>, a professional  <strong>Frontend UX/UI Developer</strong> based in Berlin, with +10 years of experience.
                        </p>
                        <p>
                            After working as a consultant for entrepreneurs, I decided that it was time to make a major change in my life and I went on a trip around the world. I visited more than 45 countries on 5 continents. I have lived and worked, mainly in the tourism sector, in Spain, Croatia, Japan, New Zealand, Montenegro, Albania, Morocco, Argentina and now in Germany.
                        </p>

                        <p>For more than 10 years I have been dedicated to Web Development, Content Creation, and Digital Marketing, with a focus on copywriting, design trends, and SEO.</p>

                        <p>
                        With a track record of creating over <strong>100 websites and successfully completing various web development projects</strong>, I&apos;ve authored <strong>300+ articles and published 3 books</strong> in Spanish. Now, I reside in Berlin with my wife and my daughter, and am eager to bring my wealth of experience to assist you with your Web Development and Design projects.
                        </p>

                        <p>
                            Feel free to reach out. I look forward to connecting. See you on the other side.
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
                            aria-label="Go to my Twitter"
                        >
                            <FaSquareXTwitter className="about-icons"/>
                        </a>
                    </div>
                    <div className="berlin-text">
                        <h3>BERLIN, DE</h3>
                    </div>
                    <img className="rulo" src={rulo} alt="" />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
