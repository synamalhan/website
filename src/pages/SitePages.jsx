import Seo from "../components/Seo";
import Reveal from "../components/Reveal";
import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import WorkExperience from "../sections/WorkExperience";
import About from "../sections/About";
import Education from "../sections/Education";
import Workshop from "../sections/Workshop";
import Contact from "../sections/Contact";

// Shared frame for the top-level pages: nav, a spacer for the fixed nav, footer.
const Page = ({ title, description, path, children }) => (
    <>
        <Seo title={`${title} | Syna Malhan`} description={description} path={path} />
        <Navbar navUp />
        <main style={{ paddingTop: 56 }}>{children}</main>
        <Footer />
    </>
);

export const ExperiencePage = () => (
    <Page title="Experience" description="Internships and roles in ML, data science and software engineering." path="/experience">
        <WorkExperience />
    </Page>
);

export const AboutPage = () => (
    <Page title="About" description="Education, interests and what I build outside work." path="/about">
        <About />
        <Reveal><Education /></Reveal>
        <Reveal><Workshop /></Reveal>
    </Page>
);

export const ContactPage = () => (
    <Page title="Contact" description="Get in touch about ML, AI and software engineering new-grad roles." path="/contact">
        <Contact />
    </Page>
);
