import AboutSection from "@components/About/AboutSection.jsx";
import CaseOfStudy from "@components/CaseOfStudy/CaseOfStudy.jsx";
import Header from "@components/Header/Header.jsx";
import Hero from "@components/Hero/Hero.jsx";
import ProjectsSection from "@components/Projects/ProjectsSection.jsx";

const Home = () => {
    return (
        <>
            <Header />
            <Hero />
            <ProjectsSection />
            <AboutSection />
            <CaseOfStudy />
        </>
    );
};

export default Home;
