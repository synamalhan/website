import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

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
      <motion.h2
        variants={titleVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
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
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        <WorkExperienceList />
      </motion.div>
    </section>
  );
};

export default WorkExperienceSection;
