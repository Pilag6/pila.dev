import "./SmallProjects.css";
import passGen from "../../assets/projects/passGen.jpg";
import banckgroundGen from "../../assets/projects/backgroundGen.webp";
import wordCount from "../../assets/projects/wordCount.webp";
import drum from "../../assets/projects/drum.webp";

const SmallProjects = () => {
    return (
        <div className="small-container">
            <h2>Small projects, big personal achievements</h2>

            <div className="small-card-wrapper">
                <article className="small-article">
                    <a href="https://the-projects-js.netlify.app/03-passgen/" target="_blank" rel="noreferrer"><img src={passGen} alt="" /></a>
                </article>
                <article className="small-article">
                    <a href="https://the-projects-js.netlify.app/04-gradientgen/" target="_blank" rel="noreferrer"><img src={banckgroundGen} alt="" /></a>
                </article>
                <article className="small-article">
                    <a href="https://the-projects-js.netlify.app/08-wordscounter/" target="_blank" rel="noreferrer"><img src={wordCount} alt="" /></a>
                </article>
                <article className="small-article">
                    <a href="https://virtualdrumbypila.netlify.app/" target="_blank" rel="noreferrer"><img src={drum} alt="" /></a>
                </article>
            </div>
        </div>
    );
};

export default SmallProjects;
