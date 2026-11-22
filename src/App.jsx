import { useRef } from "react";
import Reveal from "./components/Reveal";
import Seo from "./components/Seo";
import { useHomeScroll } from "./hooks/useHomeScroll";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Education from "./sections/Education";
import Internships from "./sections/Internships";
import Skills from "./sections/Skills";
import Featured from "./sections/Featured";
import WorkExperience from "./sections/WorkExperience";
import Workshop from "./sections/Workshop";
import Guestbook from "./sections/Guestbook";
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
            <Reveal><Featured /></Reveal>
            <Reveal><WorkExperience /></Reveal>
            <Reveal><Internships /></Reveal>
            <Reveal><Skills /></Reveal>
            <Reveal><Education /></Reveal>
            <Reveal><Workshop /></Reveal>
            <Reveal><Guestbook /></Reveal>
            <Reveal><Contact /></Reveal>
            </main>
            <Footer />
        </>
    );
}
