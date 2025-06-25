import React, { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
import bubbleAnimation from '../../assets/bubblesnew.json';
import bubblesGif from '../../assets/bubbles.gif';
import { X } from 'lucide-react';

const huesWithFilters = [
  { color: 'hsl(210, 70%, 60%)', filter: 'hue-rotate(0deg)' },
  { color: 'hsl(230, 70%, 60%)', filter: 'hue-rotate(20deg)' },
  { color: 'hsl(250, 70%, 60%)', filter: 'hue-rotate(40deg)' },
  { color: 'hsl(270, 80%, 65%)', filter: 'hue-rotate(60deg)' },
  { color: 'hsl(280, 80%, 55%)', filter: 'hue-rotate(80deg)' },
];

const WorkExperienceCard = ({ title, company, duration, summary, details, logo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { color: blobFillColor, filter: lottieFilter } = useMemo(() => {
    const idx = Math.floor(Math.random() * huesWithFilters.length);
    return huesWithFilters[idx];
  }, []);

  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, triggerOnce: false });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ ...styles.card }}
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => e.key === 'Enter' && setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* GIF background (fades out) */}
        <motion.img
          src={bubblesGif}
          alt="Animated background"
          style={{
            ...styles.lottie,
            filter: lottieFilter,
          }}
          initial={{ opacity: 1 }}
          animate={{ opacity: inView ? (hovered ? 0.06 : 0.03) : 1 }}
          transition={{ duration: 0.7 }}
        />

        {/* Lottie (fades in) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: inView ? (hovered ? 0.5 : 1) : 0 }}
          transition={{ duration: 0.7 }}
          style={{ ...styles.lottie, filter: lottieFilter }}
        >
          <Lottie animationData={bubbleAnimation} loop />
        </motion.div>

        <div style={styles.textOverlay}>
          <img src={logo} alt="Logo" style={styles.logo} />
          <div style={styles.titleText}>{title}</div>
          <div style={styles.companyText}>{company}</div>
          <div style={styles.durationText}>{duration}</div>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.blobBackground}>
              <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <g transform="translate(300,300)">
                  <path
                    d="M120,-132.6C159.2,-109.4,190.9,-71.4,191.8,-30.3C192.7,10.7,162.7,53.8,128.3,81.7C93.9,109.6,55,122.3,17.3,111.9C-20.4,101.5,-40.7,68,-67.8,45.4C-94.9,22.8,-128.9,11.4,-144.6,-16.2C-160.3,-43.8,-157.6,-88.4,-131.7,-110.4C-105.8,-132.3,-56.8,-131.6,-21.7,-116.2C13.5,-100.8,26.9,-70.9,120,-132.6Z"
                    fill={blobFillColor}
                    opacity="0.6"
                  />
                </g>
              </svg>
            </div>
            <button onClick={() => setModalOpen(false)} style={styles.closeButton} aria-label="Close modal">
              <X size={24} />
            </button>
            <img src={logo} alt="Modal Logo" style={styles.modalLogo} />
            <h2 style={styles.modalTitle}>{title}</h2>
            <p style={styles.modalSummary}>{summary}</p>
            <div style={styles.modalDetails}>{details}</div>
          </div>
        </div>
      )}
    </>
  );
};

const isSmallScreen = window.innerWidth < 500;

const styles = {
  card: {
    position: 'relative',
    width: isSmallScreen ? 200 : 300,
    height: isSmallScreen ? 200 : 300,
    margin: 20,
    cursor: 'pointer',
    borderRadius: 20,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    objectFit: 'cover',
    top: 0,
    left: 0,
  },
  textOverlay: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    color: '#fff',
    padding: '10px 15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.7)',
  },
  titleText: {
    fontSize: isSmallScreen ? '1rem' : '1.3rem',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  companyText: {
    fontSize: isSmallScreen ? '0.8rem' : '1.1rem',
    fontWeight: '800',
    color: '#95dffc',
  },
  durationText: {
    fontSize: isSmallScreen ? '0.5rem' : '0.9rem',
    fontWeight: '700',
    color: '#81c9e6',
  },
  logo: {
    height: isSmallScreen ? 20 : 40,
    marginTop: 8,
    borderRadius: 12,
    objectFit: 'contain',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#003344',
    borderRadius: 30,
    maxWidth: '60%',
    padding: isSmallScreen ? '25px 20px 30px' : '40px 30px 50px',
    boxShadow: '0 0 40px #00aaff',
    color: '#a0d8ef',
    overflow: 'hidden',
  },
  blobBackground: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 400,
    height: 400,
    opacity: 0.2,
    pointerEvents: 'none',
    zIndex: 0,
  },
  modalLogo: {
    height: isSmallScreen ? 30 : 60,
    marginBottom: 20,
    borderRadius: 8,
    objectFit: 'contain',
    display: 'block',
    margin: '0 auto',
  },
  modalTitle: {
    fontSize: isSmallScreen ? '1.3rem' : '2.5rem',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  modalSummary: {
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '15px',
    color: '#d0e8ff',
    textAlign: 'center',
  },
  modalDetails: {
    fontSize: isSmallScreen ? '0.8rem' : '1.2rem',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    textAlign: 'left',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    background: 'transparent',
    border: 'none',
    color: '#a0d8ef',
    cursor: 'pointer',
    zIndex: 2,
  },
};

export default WorkExperienceCard;
