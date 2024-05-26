import "./SmallProjects.css";
import passGen from "../../assets/projects/passGen.jpg";
import banckgroundGen from "../../assets/projects/backgroundGen.webp";
import wordCount from "../../assets/projects/wordCount.webp";
import drum from "../../assets/projects/drum.webp";
import flip from "../../assets/projects/flip.png";
import snake from "../../assets/projects/snake.png";
import todo from "../../assets/projects/todo.png";

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
                <article className="small-article">
                    <a href="https://the-projects-js.netlify.app/14-cardflip/" target="_blank" rel="noreferrer"><img src={flip} alt="" /></a>
                </article>
                <article className="small-article">
                    <a href="https://supersnakepro.netlify.app/" target="_blank" rel="noreferrer"><img src={snake} alt="" /></a>
                </article>
                <article className="small-article">
                    <a href="https://the-projects-js.netlify.app/05-todoapp/" target="_blank" rel="noreferrer"><img src={todo} alt
                    ="" /></a>
                </article>

            </div>
        </div>
    );
};

export default SmallProjects;
