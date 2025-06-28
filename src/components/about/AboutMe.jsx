import React, { useState, useEffect, useRef } from 'react';
import FloatingFishResume from './FloatingFishResume';
import FloatingFishResume2 from './FloatingFishResume2';
import FloatingFishResume3 from './FloatingFishResume3';
import FloatingFishResume4 from './FloatingFishResume4';
import FloatingFishResume5 from './FloatingFishResume5';

const AnimatedOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => ref.current && observer.unobserve(ref.current);
  }, []);

  const getTransform = () => {
    if (visible) return 'translate(0, 0)';
    switch (direction) {
      case 'right':
        return 'translateX(60px)';
      case 'left':
        return 'translateX(-60px)';
      case 'down':
        return 'translateY(-40px)';
      default:
        return 'translateY(40px)';
    }
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

const AboutMe = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 480;
  const isSmall = windowWidth < 768;

  return (
    <section
      id="about"
      style={{
        ...styles.container,
        flexDirection: isSmall ? 'column' : 'row',
        padding: isSmall ? '50px 0px' : '60px 80px',
        flexWrap: 'wrap',
      }}
    >
      {/* Left Fish Group */}
      {!isSmall && (
        <div style={styles.leftFishContainer}>
          <AnimatedOnScroll delay={0.1} direction="right">
            <div style={styles.centerFish}>
              <FloatingFishResume2 />
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={0.2} direction="right">
            <div style={styles.sideFishLeft}>
              <FloatingFishResume3 />
            </div>
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={0.3} direction="right">
            <div style={styles.sideFishRight}>
              <FloatingFishResume4 />
            </div>
          </AnimatedOnScroll>
        </div>
      )}

      {/* About Me Text */}
      <AnimatedOnScroll delay={0.15} direction="up">
        <div
          style={{
            ...styles.textContainer,
            maxWidth: isSmall ? '100%' : '600px',
            width: '100%',
            padding: '0 1rem',
            textAlign: 'center',
          }}
        >
          <h2 style={{...styles.title, paddingLeft: isSmall? '0px':'60px'}}>About Me</h2>
          <p
  style={{
    ...styles.text,
    paddingRight: isSmall ? '30px' : '0px',
    paddingLeft: isSmall ? '0px' : '60px',
  }}
>
            Hi! I'm <strong>Syna Malhan</strong>, a computer science student who loves blending logic with creativity. I thrive on building digital experiences that are not just functional, but also intuitive and delightful—whether that means writing expressive code, designing elegant algorithms, or crafting immersive front-end interfaces.
            <br /><br />
            My inspiration often comes from the ocean: its colors, movement, and quiet intelligence shape how I approach both technology and life. I believe the best solutions are those that feel as natural and seamless as the sea itself.
            <br /><br />
            <span style={styles.resumeHint}>
              🐠 P.S. If you're looking for my resume... you'll have to ask the fishes swimming around this section!
            </span>
          </p>

          {isMobile && (
            <div style={styles.mobileFishGroup}>
              <AnimatedOnScroll delay={0.1} direction="right">
                <FloatingFishResume size={40} />
              </AnimatedOnScroll>
            </div>
          )}
        </div>
      </AnimatedOnScroll>

      {/* Right Fish Group */}
      {!isMobile && (
        <div style={styles.rightFishContainer}>
          <AnimatedOnScroll delay={0.1} direction="right">
            <FloatingFishResume size={200} />
          </AnimatedOnScroll>
          <AnimatedOnScroll delay={0.2} direction="right">
            <FloatingFishResume5 size={100} />
          </AnimatedOnScroll>
        </div>
      )}
    </section>
  );
};

const styles = {
  container: {
    background: 'linear-gradient(180deg, #004466 0%, #002933 100%)',
    color: '#a0d8ef',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw',
    boxSizing: 'border-box',
  },
  textContainer: {
    fontFamily: "'Lora', serif",
    maxWidth: '60%',  
    width: '60%',
  },
  title: {
    fontFamily: "'Montserrat', sans-serif",
    marginBottom: '20px',
    color: '#00e5ff',
    textShadow: '2px 2px 6px rgba(0,0,0,1)',
    fontSize: 'clamp(2rem, 5vw, 3rem)',
  },
  text: {
    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
    lineHeight: '1.6',
  },
  resumeHint: {
    fontStyle: 'italic',
    opacity: 0.8,
  },
  leftFishContainer: {
    position: 'relative',
    width: 250,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: '40px',
    flexShrink: 0,
  },
  centerFish: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) scale(0.7)',
    zIndex: 2,
  },
  sideFishLeft: {
    position: 'absolute',
    top: '25%',
    left: '10%',
    transform: 'scale(0.5)',
    zIndex: 1,
  },
  sideFishRight: {
    position: 'absolute',
    bottom: '25%',
    right: '10%',
    transform: 'scale(0.5)',
    zIndex: 1,
  },
  rightFishContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    marginLeft: '40px',
    flexShrink: 0,
  },
  mobileFishGroup: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    flexWrap: 'wrap',
    flexDirection: 'column',

  },
};

export default AboutMe;
