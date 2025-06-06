import React, { useState, useEffect } from 'react';
import WorkExperienceList from './WorkExperienceList';

const WorkExperienceSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 480;
  const isSmall = windowWidth < 768;

  const fontSizeTitle = isMobile ? '2rem' : isSmall ? '2.5rem' : '3rem';

  return (
    <section
      id="experience"
      style={{
        background: 'linear-gradient(180deg, #002933 0%, #001a1f 100%)',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#a0d8ef',
        textAlign: 'center',
      }}
    >
      <h2
        style={{
          fontSize: fontSizeTitle,
          marginBottom: '80px',
          paddingBottom: '20px',
          color: '#92daf7',
          fontFamily: "'Montserrat', sans-serif",
          textShadow: '2px 2px 6px rgba(0, 0, 0, 1)',
          textAlign: 'center',
        }}
      >
        Work Experience
      </h2>
      <WorkExperienceList />
    </section>
  );
};

export default WorkExperienceSection;
