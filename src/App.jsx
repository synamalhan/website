import { useRef } from "react";
import { ThemeProvider, useTheme } from "./theme/ThemeContext";
import { FONTS } from "./components/styles";
import { useAssemblyScroll } from "./hooks/useAssemblyScroll";

import GlobalStyle from "./components/GlobalStyle";
import OceanBg from "./components/OceanBg";
import Cursor from "./components/Cursor";

import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Assembly from "./sections/Assembly";
import About from "./sections/About";
import WorkExperience from "./sections/WorkExperience";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import WaveformSection from "./sections/WaveformSection";
import Blog from "./sections/Blog";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

function AppContent() {
    const { theme: t } = useTheme();
    const asmRef = useRef();
    const abtRef = useRef();
    const { prog, inAssembly, navUp, counts } = useAssemblyScroll(asmRef, abtRef);

    return (
        <div style={{ background: t.bg, color: t.text, ...FONTS.inter, overflowX: "hidden", minHeight: "100vh", transition: "background .4s, color .4s" }}>
            <GlobalStyle />
            <OceanBg t={t} />
            <Cursor t={t} />

            <Navbar navUp={navUp} />
            <Hero />
            <About ref={abtRef} counts={counts} />
            <WorkExperience />
            <Skills />
            <Projects />
            <WaveformSection />
            <Blog />
            <Contact />
            <Assembly ref={asmRef} prog={prog} inAssembly={inAssembly} />
            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
