import CaseCards from "./CaseCards.jsx";
import "./CaseOfStudy.css";

import drawHeroArrow from "../../assets/draw-hero-arrow.svg";

const CaseOfStudy = () => {
    return (
        <div className="study-container">
            <h2>Case of Study</h2>
            <div className="study-cards-wrapper">
                <CaseCards
                    title={"Inspiration"}
                    desc={
                        "For a while, I had been intrigued by the New Brutalism design trend and decided to take on the challenge of creating my own website in this style. After studying various designs within this trend, I opted to follow the New Brutalism with a mix of Memphis style, but with a slightly muted color palette. The vibrant colors initially associated with the trend were too intense for my taste."
                    }
                />
    
                <img src={drawHeroArrow} alt="" />
                <CaseCards
                    title={"Design"}
                    desc={
                        "I began the design process in Figma, drawing inspiration from the community and utilizing resources available there. I create the color palette and choose the typography, and then I started to design the components. I used the Auto Layout feature to create the responsive design. Finaly, I created a prototype to test the user experience and I downloaded the drawings in SVG format to use them in the development phase."
                    }
                />
                
                <img src={drawHeroArrow} alt="" />
                <CaseCards
                    title={"Development I"}
                    desc={
                        "Now it was the time to create the the website. I used React with Vite as a library/framework. CSS Grid in combination with Flexbox to create the layout. I also created some CSS variables to manage the colors, fonts, border, shadows and paddings. I also used the Lighthouse tool to optimize the website for performance and SEO. Finally, I deployed the website first in GitHub and then I linked it to Netlify."
                    }
                />
            </div>

            
        </div>
    );
};

export default CaseOfStudy;
