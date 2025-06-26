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
          marginBottom: '10px',
          color: '#92daf7',
          fontFamily: "'Montserrat', sans-serif",
          textShadow: '2px 2px 6px rgba(128, 128, 128, 0.8)',
          textAlign: 'center',
        }}
      >
        Projects
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.3 }}
        style={{ fontSize: isMobile ? '1rem' : '1.2rem', color: '#a0d8ef', marginBottom: '30px', fontWeight: 500, textAlign: 'center' }}
      >
        From hackathons to production—exploring, building, and sharing what excites me.
      </motion.div>
      <ProjectList />
    </section>
  );
};

export default ProjectSection;
