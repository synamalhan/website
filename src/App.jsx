import { useRef } from "react";
import Reveal from "./components/Reveal";
import Seo from "./components/Seo";
import { useHomeScroll } from "./hooks/useHomeScroll";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";
import Featured from "./sections/Featured";
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
            <Stats ref={abtRef} counts={counts} />
            <Reveal><Featured /></Reveal>
            </main>
            <Footer />
        </>
    );
}
