import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';

import Navbar from '../components/global/Navbar';
import HeroSection from '../components/hero/HeroSection';
import AboutMe from '../components/about/AboutMe';
import WorkExperienceSection from '../components/experience/WorkExperienceSection';
import ProjectSection from '../components/projects/ProjectSection';
import SkillSection from '../components/skills/SkillSection';
import ContactSection from '../components/contacts/ContactSection';
import SunkenShipSection from '../components/hobbies/SunkenShipSection';
import UpdatesSection from '../components/updates/UpdatesSection';

import BubbleOverlay from '../components/common/BubbleOverlay';
import ReefOverlay from '../components/common/ReefOverlay';
import CrabOverlay from '../components/common/CrabOverlay';
import FishBottomOverlay from '../components/common/FishBottomOverlay';

const HomePage = () => {
  const [opacity, setOpacity] = useState(1);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxScroll = 300; // How much scroll it takes to fade out
    const newOpacity = Math.max(0, 1 - scrollTop / maxScroll);
    setOpacity(newOpacity);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>

      <BubbleOverlay />
      {/* <ReefOverlay /> */}
      <Navbar />
      <HeroSection />
      <AboutMe />
      <WorkExperienceSection />
      <ProjectSection />
      <SkillSection />
      <ContactSection />
      <SunkenShipSection />
      <CrabOverlay />
      <FishBottomOverlay />
    </div>
  );
};

export default HomePage;
