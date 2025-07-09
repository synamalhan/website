// src/App.jsx
import React from 'react';
import HeroSection from './components/HeroSection';
import Navbar from './components/Navbar';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import MacbookWrapper from './components/MacbookWrapper';
import AboutSection from './components/AboutSection'; 
import ContactSection from './components/ContactSection';
import ClickSpark from './components/reactbits/ClickSpark'; // adjust path as needed
import InteractiveBits from './components/InteractiveBits';
function App() {
  return (

    <ClickSpark
      sparkColor="#a78bfa" // soft purple
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="bg-[#f7f8f9] text-gray-800 font-sans">
        <Navbar />
        <HeroSection />
        <MacbookWrapper>
          <AboutSection />
        </MacbookWrapper>
        <MacbookWrapper>
          <ExperienceSection />
        </MacbookWrapper>
        <MacbookWrapper>
          <ProjectsSection />
        </MacbookWrapper>
         <MacbookWrapper>
          <InteractiveBits />
        </MacbookWrapper>
        <ContactSection />
        <Footer />
      </div>
    </ClickSpark>
  );
}

export default App;
