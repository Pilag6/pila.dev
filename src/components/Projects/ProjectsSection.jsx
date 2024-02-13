import ProjectsCards from "./ProjectsCards.jsx";
import "./ProjectsSection.css";
import ecommerce from "../../assets/projects/ecommerce-crusaders.webp";
import riverPlate from "../../assets/projects/river-plate.webp";
import olga from "../../assets/projects/olga.webp";
import wooltrip from "../../assets/projects/wooltrip.webp";
import integral from "../../assets/projects/integral.webp";
import bauchbaum from "../../assets/projects/bauchbaum.webp";

const ProjectsSection = () => {
    return (
        <section className="projects" id="projects">
            <div className="projects-logo">
                <h2>MY PROJECTS</h2>
            </div>

            <div className="projects-cards">

                {/* CARD #1 */}
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

                {/* CARD #2 */}
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
                    title={"bauchbaum"}
                    bgCard={"hsl(65, 80%, 76%)"}
                    image={bauchbaum}
                    span={"span-5"}
                    widthSpan={"15%"}
                    time1={"1:01"}
                    time2={"3:54"}
                    url={"https://pilag6.github.io/Buchsbaum/"}
                />
            </div>
        </section>
    );
};

export default ProjectsSection;
