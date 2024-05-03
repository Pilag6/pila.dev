import ProjectsCards from "./ProjectsCards.jsx";
import "./ProjectsSection.css";

import { FaGithubSquare } from "react-icons/fa";

// Images
import ecommerce from "../../assets/projects/ecommerce-crusaders.webp";
import riverPlate from "../../assets/projects/river-plate.webp";
import olga from "../../assets/projects/olga.webp";
import wooltrip from "../../assets/projects/wooltrip.webp";
import integral from "../../assets/projects/integral.webp";
// import bauchbaum from "../../assets/projects/bauchbaum.webp";
import akpica from "../../assets/projects/akpica.webp";
import ProjectsRelease from "./ProjectsRelease.jsx";
import mern from "../../assets/projects/mern.webp";
import server from "../../assets/projects/server.webp";
import reactV from "../../assets/projects/react.webp";

import releaseGrid from "../..//assets/release-grid.svg";
import releaseFlex from "../../assets/release-flex.svg";
import releaseAnimation from "../../assets/release-animations.svg";
import js from "../../assets/js.svg";
import react from "../../assets/react.svg";
import next from "../../assets/next.svg";
import StarterKits from "./StarterKits.jsx";

const ProjectsSection = () => {
    return (
        <section className="projects" id="projects">
            <div className="projects-logo">
                <h2>MY PROJECTS</h2>
            </div>

            <div className="projects-cards">
                {/* CARD #1 */}
                <ProjectsCards
                    title={"akpica ecommerce"}
                    bgCard={"hsl(65, 80%, 76%)"}
                    image={akpica}
                    span={"span-5"}
                    widthSpan={"15%"}
                    time1={"1:01"}
                    time2={"3:54"}
                    url={"https://akpica.netlify.app/"}
                />

                {/* CARD #2 */}
                <ProjectsCards
                    title={"Crusaders eCommerce"}
                    bgCard={"hsl(328, 97%, 88%)"}
                    image={ecommerce}
                    span={"span-1"}
                    widthSpan={"25%"}
                    time1={"0:39"}
                    time2={"3:14"}
                    url={"https://crusaders-ecommerce.netlify.app/"}
                />

                {/* CARD #3 */}
                <ProjectsCards
                    title={"River Plate Berlin"}
                    bgCard={"hsl(260, 100%, 88%)"}
                    image={riverPlate}
                    span={"span-3"}
                    widthSpan={"35%"}
                    time1={"3:01"}
                    time2={"9:12"}
                    url={"https://www.riverplateberlin.com/"}
                />

                {/* CARD #4 */}
                <ProjectsCards
                    title={"Integral Piscinas"}
                    bgCard={"hsl(209, 82%, 83%)"}
                    image={integral}
                    span={"span-4"}
                    widthSpan={"60%"}
                    time1={"2:03"}
                    time2={"4:00"}
                    url={"https://integralpiscinas.netlify.app/"}
                />

                {/* CARD #5 */}
                <ProjectsCards
                    title={"WoolTrip"}
                    bgCard={"hsl(177, 61%, 73%) "}
                    image={wooltrip}
                    span={"span-5"}
                    widthSpan={"15%"}
                    time1={"1:01"}
                    time2={"3:54"}
                    url={"https://pilag6.github.io/Wooltrip---Tour-Travel/"}
                />

                {/* CARD #6 */}
                <ProjectsCards
                    title={"Olga Photos"}
                    bgCard={"hsl(43, 100%, 80%)"}
                    image={olga}
                    span={"span-2"}
                    widthSpan={"46%"}
                    time1={"3:31"}
                    time2={"5:55"}
                    url={"https://olgaphotos.com/"}
                />
            </div>

            <div className="projects-release">
                <h2>LATEST REALEASE</h2>
                <div className="release-container">
                    {/* Release #1 */}
                    <ProjectsRelease
                        title={"JavaScript"}
                        bgRelease={"hsl(43, 100%, 80%)"}
                        urlRelease={"https://the-projects-js.netlify.app/"}
                        releaseTitle={"The Projects JS"}
                        imgTitleRelease={js}
                        imgRelease={releaseGrid}
                        releaseDescription={
                            "JavaScript Projects for mastering the art of web development through hands-on practice with Vanilla JavaScript!"
                        }
                    />

                    {/* Release #2 */}
                    <ProjectsRelease
                        title={"React/Vite"}
                        bgRelease={"hsl(209, 82%, 83%)"}
                        urlRelease={"https://github.com/Pilag6/rvct"}
                        releaseTitle={"Clean Template"}
                        imgTitleRelease={react}
                        imgRelease={releaseAnimation}
                        releaseDescription={
                            "This template provides a minimal setup to get React working in Vite, completely clean, without any extra noise."
                        }
                    />

                    {/* Release #3 */}

                    <ProjectsRelease
                        title={"Next.js"}
                        bgRelease={"hsl(177, 61%, 73%)"}
                        urlRelease={"https://001-restaurant.netlify.app/"}
                        releaseTitle={"Pizza/restaurant"}
                        imgTitleRelease={next}
                        imgRelease={releaseFlex}
                        releaseDescription={
                            "Responisve restaurant website using the powerful combination of React, Next.js, TypeScript, and Tailwind CSS."
                        }
                    />
                </div>
            </div>

            <div className="starter-kits">
                <h2>STARTER KITS</h2>

                <p>💻 These are a serie of <strong>Starter Kits</strong> that I created to save fellow developers the hassle of configuration and setup, allowing you to dive straight into what you love most: <code>coding!</code> With this starting kits, you can focus more on bringing your ideas to life and less on the intricacies of setting up your projects from scratch 💻</p>

                <div className="starter-kits-container">
                    <StarterKits startingImg={server} starterLink={"https://github.com/Pilag6/basicServer"}/>
                    <StarterKits startingImg={reactV}  starterLink={"https://github.com/Pilag6/rvct"}/>
                    <StarterKits startingImg={mern} starterLink={"https://github.com/Pilag6/MERN"}/>
                </div>
            </div>

            <div className="more-projects">
                <a href="https://github.com/Pilag6">
                    Find More Projects in my GitHub{" "}
                    <FaGithubSquare className="more-projects-icon" />
                </a>
            </div>
        </section>
    );
};

export default ProjectsSection;
