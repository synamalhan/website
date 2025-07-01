import React, { useState, useMemo, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import jellyfishGif from '../../assets/jellyfish.gif';
import jellyfish from '../../assets/jellyfishsmall.json';
import { X } from 'lucide-react';

const huesWithFilters = [
  { color: '#00d2ff', filter: 'hue-rotate(0deg)' },
  { color: '#ff6ec4', filter: 'hue-rotate(15deg)' },
  { color: '#c471ed', filter: 'hue-rotate(1200deg)' },
  { color: '#f7797d', filter: 'hue-rotate(250deg)' },
  { color: '#12c2e9', filter: 'hue-rotate(90deg)' },
  { color: '#fcb045', filter: 'hue-rotate(60deg)' },
  { color: '#ff9a9e', filter: 'hue-rotate(20deg)' },
  { color: '#42e695', filter: 'hue-rotate(30deg)' },
  { color: '#fad0c4', filter: 'hue-rotate(300deg)' },
  { color: '#a1c4fd', filter: 'hue-rotate(270deg)' },
];

const ProjectCard = ({ title, description, details, image, links, techStack = [], badge }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);
  const [isVisible, setIsVisible] = useState(false);
  const [modalHue, setModalHue] = useState({ color: '', filter: '' });
  const [jellyfishRotation, setJellyfishRotation] = useState(0);
  const cardRef = useRef(null);

  const { color: blobFillColor, filter: lottieFilter } = useMemo(() => {
    const idx = Math.floor(Math.random() * huesWithFilters.length);
    return huesWithFilters[idx];
  }, []);

  useEffect(() => {
    setJellyfishRotation(Math.floor(Math.random() * 30) - 15);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const openModal = () => {
    setModalHue({ color: blobFillColor, filter: lottieFilter });
    setModalOpen(true);
  };

  const styles = {
    card: {
      position: 'relative',
      width: isSmallScreen ? 150 : 250,
      height: isSmallScreen ? 150 : 250,
      cursor: 'pointer',
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      transform: `rotate(${jellyfishRotation}deg)`,
      objectFit: isSmallScreen ? 'contain' : 'cover',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      filter: lottieFilter,
      opacity: 0.8,
    },
    textOverlay: {
      position: 'relative',
      zIndex: 1,
      textAlign: 'center',
      color: '#fff',
      padding: 15,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      textShadow: '2px 2px 6px rgba(0,0,0,0.7)',
    },
    titleText: {
      fontSize: isSmallScreen ? '0.7rem' : '1rem',
      fontWeight: '700',
    },
    techStackContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      justifyContent: 'center',
      marginTop: '6px',
    },
    techPill: {
      fontSize: isSmallScreen ? '0.5rem' : '0.65rem',
      padding: isSmallScreen ? '2px 8px' : '4px 10px',
      borderRadius: '999px',
      backgroundColor: `${blobFillColor}33`,
      color: '#fff',
      backdropFilter: 'blur(4px)',
      fontWeight: '500',
      whiteSpace: 'nowrap',
    },
    badge: {
      backgroundColor: '#ffffffaa',
      color: '#001f2f',
      fontWeight: '600',
      fontSize: isSmallScreen ? '0.5rem' : '0.65rem',
      padding: isSmallScreen ? '2px 8px' : '4px 10px',
      borderRadius: '999px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    },
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 15, 30, 0.75)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      padding: '20px',
    },
    modalContent: {
      position: 'relative',
      backgroundColor: '#001f2f',
      borderRadius: 30,
      maxHeight: '80%',
      maxWidth: '90%',
      width: isSmallScreen ? '90%' : '50%',
      padding: isSmallScreen ? '30px 20px' : '40px 30px 50px 50px',
      boxShadow: '0 0 30px #00d2ff',
      color: '#a0eefd',
      overflowY: 'auto',
    },
    closeButton: {
      position: 'absolute',
      top: 15,
      right: 15,
      background: 'transparent',
      border: 'none',
      color: '#a0d8ef',
      cursor: 'pointer',
    },
    modalTitle: {
      fontSize: isSmallScreen ? '1rem' : '2rem',
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center',
      marginBottom: '10px',
    },
    modalDescription: {
      fontSize: isSmallScreen ? '0.7rem' : '1.1rem',
      fontWeight: '500',
      marginBottom: '15px',
      color: '#d0e8ff',
      textAlign: 'center',
    },
    modalDetails: {
      fontSize: isSmallScreen ? '0.6rem' : '1.1rem',
      lineHeight: 1.5,
      whiteSpace: 'pre-wrap',
    },
    modalLinks: {
      marginTop: 25,
      paddingTop: 15,
      borderTop: '1px solid #00d2ff',
    },
    linksTitle: {
      fontSize: isSmallScreen ? '0.9rem' : '1.25rem',
      color: '#ffffff',
      marginBottom: 10,
      textAlign: 'center',
    },
    linkList: {
      listStyleType: 'none',
      paddingLeft: 0,
      display: 'flex',
      justifyContent: 'center',
      gap: 20,
    },
    linkAnchor: {
      fontSize: isSmallScreen ? '0.7rem' : '1.1rem',
      color: '#00d2ff',
      textDecoration: 'none',
      fontWeight: '600',
    },
  };

  return (
    <>
      <div
        ref={cardRef}
        style={{
          ...styles.card,
          transform: `
            ${isVisible ? 'translateY(0)' : 'translateY(40px)'}
            ${isHovered ? ' scale(1.2)' : ' scale(1)'}
          `,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.4s ease, opacity 0.6s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
        role="button"
        tabIndex={0}
       >
        <img src={jellyfishGif} alt="Animated jellyfish" style={styles.lottie} />
        <div style={styles.textOverlay}>
          {badge && <div style={styles.badge}>{badge}</div>}
          <div style={styles.titleText}>{title}</div>
          <div style={styles.techStackContainer}>
            {techStack.map((tech, idx) => (
              <span key={idx} style={styles.techPill}>{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <>
          <style>{`
            @keyframes floatFade {
              0%   { transform: translateY(0); opacity: 0.2; }
              50%  { transform: translateY(-10px); opacity: 0.35; }
              100% { transform: translateY(0); opacity: 0.2; }
            }
          `}</style>
          <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              {Array.from({ length: 7 }).map((_, i) => {
                const size = Math.floor(Math.random() * 80) + 60;
                const top = Math.random() * 100;
                const left = Math.random() * 100;
                const hue = Math.floor(Math.random() * 360);
                const duration = Math.random() * 10 + 6;
                const delay = Math.random() * 5;
                return (
                  <div
                    key={`jellyfish-${i}`}
                    style={{
                      position: 'absolute',
                      top: `${top}%`,
                      left: `${left}%`,
                      width: `${size}px`,
                      height: `${size}px`,
                      pointerEvents: 'none',
                      zIndex: 0,
                      opacity: 0.2,
                      filter: `blur(1px) hue-rotate(${hue}deg)`,
                      animation: `floatFade ${duration}s ease-in-out ${delay}s infinite`,
                    }}
                  >
                    <Lottie animationData={jellyfish} loop autoplay />
                  </div>
                );
              })}
              <button onClick={() => setModalOpen(false)} style={styles.closeButton}>
                <X size={24} />
              </button>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={styles.modalTitle}>{title}</h2>
                <p style={styles.modalDescription}>{description}</p>
                <div style={styles.modalDetails}>{details}</div>
                {links?.length > 0 && (
                  <div style={styles.modalLinks}>
                    <h3 style={styles.linksTitle}>Links</h3>
                    <ul style={styles.linkList}>
                      {links.map((linkObj, index) => (
                        <li key={index}>
                          <a
                            href={linkObj.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.linkAnchor}
                          >
                            {linkObj.label || 'View Project'}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectCard;
