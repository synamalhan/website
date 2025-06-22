// src/components/HeroSection.jsx
import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import fishesAnimation from '../../assets/fishes.json'; // Adjust path as needed
import useMouseParallax from '../../hooks/useMouseParallax';

const HeroSection = () => {
  // Parallax offsets for each element
  const nameOffset = useMouseParallax(0.08); // more movement
  const taglineOffset = useMouseParallax(0.04); // less movement
  const lottieOffset = useMouseParallax(0.02); // subtle movement

  return (
    <>
    <section id="hero" style={styles.container}>
      <motion.h1
        style={{
          ...styles.name,
          transform: `translate3d(${nameOffset.x}px, ${nameOffset.y}px, 0)`
        }}
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Syna Malhan
      </motion.h1>

      <motion.p
        style={{
          ...styles.tagline,
          transform: `translate3d(${taglineOffset.x}px, ${taglineOffset.y}px, 0)`
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        Exploring tech depths with code & creativity
      </motion.p>

      <div
        style={{
          ...styles.lottieWrapper,
          transform: `translate3d(${lottieOffset.x}px, ${lottieOffset.y}px, 0)`
        }}
      >
        <Lottie
          animationData={fishesAnimation}
          loop={true}
          style={styles.lottie}
        />
      </div>
    </section>
    </>
  );
};

const isSmallScreen = window.innerWidth < 500;

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(180deg, #87CEEB 0%, #004466 100%)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#e0f7fa',
    textAlign: 'center',
    position: 'relative',
    padding: '0 20px',
    overflow: 'hidden',
    zIndex: 1,
  },
  name: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '5rem',
    fontWeight: '700',
    margin: 0,
    textShadow: '0 0 10px #edbfff',
    zIndex: 2,
    position: 'relative',
    willChange: 'transform',
  },
  tagline: {
    fontFamily: "'Lora', serif",
    fontSize: '1.8rem',
    marginTop: '1rem',
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#edbfff',
    maxWidth: '600px',
    zIndex: 2,
    position: 'relative',
    willChange: 'transform',
  },
  downArrow: {
    marginTop: '3rem',
    fontSize: '3rem',
    cursor: 'pointer',
    color: '#a0d8ef',
    zIndex: 2,
    position: 'relative',
  },
  lottieWrapper: {
    position: 'absolute',
    bottom: 0,
    width: isSmallScreen ? '250%' : '100%',
    pointerEvents: 'none',
    zIndex: 0,
    willChange: 'transform',
  },
  lottie: {
    width: isSmallScreen ? '200%' : '100%',
    height: '100%',
    filter: 'hue-rotate(20deg)',
  },
};

export default HeroSection;
