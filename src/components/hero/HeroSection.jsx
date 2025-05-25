// src/components/HeroSection.jsx
import React from 'react';
import Lottie from 'lottie-react';
import fishesAnimation from '../../assets/fishes.json'; // Adjust path as needed

const HeroSection = () => {
  return (
    <section id="hero" style={styles.container}>
      <h1 style={styles.name}>Syna Malhan</h1>
      <p style={styles.tagline}>Exploring tech depths with code & creativity</p>
      <div style={styles.downArrow}>&#x2193;</div>

      <div style={styles.lottieWrapper}>
        <Lottie 
          animationData={fishesAnimation}
          loop={true}
          style={styles.lottie}
        />
      </div>
    </section>
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
    zIndex: 1, // Text content stays on top
  },
  name: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '5rem',
    fontWeight: '700',
    margin: 0,
    textShadow: '0 0 10px #edbfff',
    zIndex: 2, // ensure text stays above animation
    position: 'relative',
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
  },
  downArrow: {
    marginTop: '3rem',
    fontSize: '3rem',
    animation: 'bounce 2s infinite',
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
    zIndex: 0, // 👈 lower this so it’s in the background
  },
  lottie: {
    width: isSmallScreen ? '150%' : '100%',
    height: '100%',
    filter: 'hue-rotate(20deg)',
  },
};

export default HeroSection;