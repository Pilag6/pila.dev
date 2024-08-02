/* eslint-disable react/prop-types */
import "./SmallProjects.css";

import SmallProjectCard from "./SmallProjectCard.jsx";

// Import all images
import passGen from "../../assets/projects/passGen.jpg";
import banckgroundGen from "../../assets/projects/backgroundGen.webp";
import wordCount from "../../assets/projects/wordCount.webp";
import drum from "../../assets/projects/drum.webp";
import flip from "../../assets/projects/flip.png";
import snake from "../../assets/projects/snake.png";
import todo from "../../assets/projects/todo.png";
import perfect4 from "../../assets/projects/perfect4.webp";

const projectsData = [
  {
    title: "Perfect 4",
    image: perfect4,
    url: "https://perfect-4.netlify.app/",
  },
  {
    title: "Password Generator",
    image: passGen,
    url: "https://the-projects-js.netlify.app/03-passgen/",
  },
  {
    title: "Background Generator",
    image: banckgroundGen,
    url: "https://the-projects-js.netlify.app/04-gradientgen/",
  },
  {
    title: "Word Counter",
    image: wordCount,
    url: "https://the-projects-js.netlify.app/08-wordscounter/",
  },
  {
    title: "Virtual Drum",
    image: drum,
    url: "https://virtualdrumbypila.netlify.app/",
  },
  {
    title: "Card Flip",
    image: flip,
    url: "https://the-projects-js.netlify.app/14-cardflip/",
  },
  {
    title: "Super Snake Pro",
    image: snake,
    url: "https://supersnakepro.netlify.app/",
  },
  {
    title: "Todo App",
    image: todo,
    url: "https://the-projects-js.netlify.app/05-todoapp/",
  },
];


const SmallProjects = () => {
  return (
    <div className="small-container">
      <h2>Small projects, big personal achievements</h2>
      <div className="small-card-wrapper">
        {projectsData.map((project, index) => (
          <SmallProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SmallProjects;