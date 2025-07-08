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

function App() {
  return (
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
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
