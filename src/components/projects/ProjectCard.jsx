import React, { useState, useMemo, useEffect, useRef } from 'react';
import jellyfishGif from '../../assets/jellyfish.gif';
import { X } from 'lucide-react';

const huesWithFilters = [
  { color: '#00d2ff', filter: 'hue-rotate(0deg)' },
  { color: '#00bfff', filter: 'hue-rotate(15deg)' },
  { color: '#00cfff', filter: 'hue-rotate(30deg)' },
  { color: '#00aaff', filter: 'hue-rotate(-15deg)' },
  { color: '#00e0ff', filter: 'hue-rotate(45deg)' },
  { color: '#00ccff', filter: 'hue-rotate(-30deg)' },
  { color: '#00b3ff', filter: 'hue-rotate(-45deg)' },
  { color: '#00d6ff', filter: 'hue-rotate(75deg)' },
  { color: '#00a6ff', filter: 'hue-rotate(-60deg)' },
  { color: '#00c6ff', filter: 'hue-rotate(90deg)' },
  { color: '#00e6f6', filter: 'hue-rotate(60deg)' },
  { color: '#00b6ff', filter: 'hue-rotate(-75deg)' },
  { color: '#00d4ff', filter: 'hue-rotate(105deg)' },
  { color: '#00a0ff', filter: 'hue-rotate(90deg)' },
  { color: '#00c0ff', filter: 'hue-rotate(120deg)' },
  { color: '#00e4ff', filter: 'hue-rotate(135deg)' },
  { color: '#00b4ff', filter: 'hue-rotate(-105deg)' },
];

const ProjectCard = ({ title, description, details, image, links, techStack = [] }) => {
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
    const angle = Math.floor(Math.random() * 30) - 15;
    setJellyfishRotation(angle);
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

  return (
    <>
      <div
        ref={cardRef}
        style={{
          ...styles.card(isSmallScreen),
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
        <img
          src={jellyfishGif}
          alt="Animated jellyfish"
          style={{
            ...styles.lottie(jellyfishRotation, isSmallScreen),
            filter: lottieFilter,
            opacity: 0.8,
          }}
        />

        <div style={styles.textOverlay}>
          <div style={styles.titleText(isSmallScreen)}>{title}</div>
          <div style={styles.techStackContainer}>
            {techStack.map((tech, idx) => (
              <span
                key={idx}
                style={{
                  ...styles.techPill,
                  backgroundColor: `${blobFillColor}33`,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setModalOpen(false)} style={styles.closeButton}>
              <X size={24} />
            </button>
            <h2 style={styles.modalTitle}>{title}</h2>
            <p style={styles.modalDescription}>{description}</p>
            <div style={styles.modalDetails}>{details}</div>
            {links?.length > 0 && (
              <div style={styles.modalLinks}>
                <h3 style={styles.linksTitle}>Links</h3>
                <ul style={styles.linkList}>
                  {links.map((linkObj, index) => (
                    <li key={index} style={styles.linkItem}>
                      <a href={linkObj.url} target="_blank" rel="noopener noreferrer" style={styles.linkAnchor}>
                        {linkObj.label || 'View Project'}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  card: (isSmallScreen) => ({
    position: 'relative',
    width: isSmallScreen ? 150 : 250,
    height: isSmallScreen ? 150 : 250,
    borderRadius: isSmallScreen ? 50 : 80,
    overflow: 'hidden',
    cursor: 'pointer',
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  lottie: (rotation, isSmallScreen) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    transform: `rotate(${rotation}deg)`,
    objectFit: isSmallScreen ? 'contain' : 'cover',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  }),

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

  titleText: (isSmallScreen) => ({
    fontSize: isSmallScreen ? '0.7rem' : '1rem',
    fontWeight: '700',
  }),

  techStackContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    justifyContent: 'center',
    marginTop: '6px',
  },

  techPill: {
    fontSize: '0.65rem',
    padding: '4px 10px',
    borderRadius: '999px',
    color: '#fff',
    backdropFilter: 'blur(4px)',
    fontWeight: '500',
    whiteSpace: 'nowrap',
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
    padding: '40px 30px 50px 50px',
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
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: '10px',
  },

  modalDescription: {
    fontSize: '1.1rem',
    fontWeight: '500',
    marginBottom: '15px',
    color: '#d0e8ff',
    textAlign: 'center',
  },

  modalDetails: {
    fontSize: '1.1rem',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },

  modalLinks: {
    marginTop: 25,
    paddingTop: 15,
    borderTop: '1px solid #00d2ff',
  },

  linksTitle: {
    fontSize: '1.25rem',
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

  linkItem: {},

  linkAnchor: {
    fontSize: '1.1rem',
    color: '#00d2ff',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

export default ProjectCard;
