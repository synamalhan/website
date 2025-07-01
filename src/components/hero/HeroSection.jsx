import React, { useRef , useEffect} from 'react';
import Lottie from 'lottie-react';
import { motion, useInView } from 'framer-motion';
import fishesAnimation from '../../assets/fishes.json';
import useMouseParallax from '../../hooks/useMouseParallax';
import Orb from '../common/Orb';
const floatDownVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 + i * 0.07,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const HeroSection = () => {
  const nameOffset = useMouseParallax(0.08);
  const taglineOffset = useMouseParallax(0.04);
  const lottieOffset = useMouseParallax(0.02);
  const name = "Syna Malhan";
  const [isSmallScreen, setIsSmallScreen] = React.useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 500);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold: 0.3,
    triggerOnce: false, // important: animate on every scroll in
  });

  return (
    <section id="hero" style={styles.container} ref={ref}>
  <div style={styles.orbWrapper}>
    <Orb hue={200} hoverIntensity={0.4} rotateOnHover={true} />
  </div>

  <h1
    style={{
      ...styles.name,
      transform: `translate3d(${nameOffset.x}px, ${nameOffset.y}px, 0)`,
    }}
  >
        {(isSmallScreen ? name.split(' ') : [name]).map((part, partIdx, arr) => (
  <React.Fragment key={partIdx}>
    {part.split('').map((char, i) => (
      <motion.span
        key={`${partIdx}-${i}`}
        custom={i + partIdx * 10}
        variants={floatDownVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ display: 'inline-block' }}
      >
        {char}
      </motion.span>
    ))}
    {isSmallScreen && partIdx < arr.length - 1 && <br />}
    {!isSmallScreen && partIdx < arr.length - 1 && (
      <motion.span
        key={`space-${partIdx}`}
        custom={part.length + partIdx * 10}
        variants={floatDownVariant}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        style={{ display: 'inline-block' }}
      >
        {'\u00A0'}
      </motion.span>
    )}
  </React.Fragment>
))}


      </h1>

  <motion.p
    style={{
      ...styles.tagline,
      transform: `translate3d(${taglineOffset.x}px, ${taglineOffset.y}px, 0)`,
    }}
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, delay: 0.5 }}
  >
    Exploring tech depths with code & creativity
  </motion.p>
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
  orbWrapper: {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
  pointerEvents: 'none',
},

};

export default HeroSection;
