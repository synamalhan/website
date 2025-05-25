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
  },
  name: {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '5rem',
    fontWeight: '700',
    margin: 0,
    textShadow: '0 0 10px #edbfff',
  },
  tagline: {
    fontFamily: "'Lora', serif",
    fontSize: '1.8rem',
    marginTop: '1rem',
    fontWeight: '400',
    fontStyle: 'italic',
    color: '#edbfff',
    maxWidth: '600px',
  },
  downArrow: {
    marginTop: '3rem',
    fontSize: '3rem',
    animation: 'bounce 2s infinite',
    cursor: 'pointer',
    color: '#a0d8ef',
  },
  lottieWrapper: {
    position: 'absolute',
    bottom: 0,
    width: isSmallScreen? '250%' : '100%',
    pointerEvents: 'none',
    zIndex: 1,
  },
  lottie: {
    width:'100%',
    height: '100%',
    filter: 'hue-rotate(0deg)',     
  },
};

export default HeroSection;
