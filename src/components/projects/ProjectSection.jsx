import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectList from './ProjectList';

const ProjectSection = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 480;
  const isSmall = windowWidth < 768;
  const fontSizeTitle = isMobile ? '2rem' : isSmall ? '2.5rem' : '3rem';

  const titleVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id="projects"
      style={{
        background: 'linear-gradient(180deg, #001a1f 0%, #00171c 100%)',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#a0d8ef',
      }}
    >
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        style={{
          fontSize: fontSizeTitle,
          marginTop: '100px',
          marginBottom: '30px',
          color: '#92daf7',
          fontFamily: "'Montserrat', sans-serif",
          textShadow: '2px 2px 6px rgba(128, 128, 128, 0.8)',
          textAlign: 'center',
        }}
      >
        Projects
      </motion.h2>
      <ProjectList />
    </section>
  );
};

export default ProjectSection;
