import { useRef } from "react";
import Seo from "./components/Seo";
import { useHomeScroll } from "./hooks/useHomeScroll";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Workshop from "./sections/Workshop";
import About from "./sections/About";
import Education from "./sections/Education";
import Internships from "./sections/Internships";
import Skills from "./sections/Skills";
import Featured from "./sections/Featured";
import WorkExperience from "./sections/WorkExperience";
import WaveformSection from "./sections/WaveformSection";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function Home() {
    const abtRef = useRef();
    const { navUp, counts } = useHomeScroll(abtRef);

    return (
        <>
            <Seo title="Syna Malhan: ML/AI & Software Engineering" />
            <Navbar navUp={navUp} />
            <main>
            <Hero />
            <About ref={abtRef} counts={counts} />
            <Education />
            <WorkExperience />
            <Internships />
            <Featured />
            <Skills />
            <WaveformSection />
            <Contact />
            <Workshop />
            </main>
            <Footer />
        </>
    );
}
