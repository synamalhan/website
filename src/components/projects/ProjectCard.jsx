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

const blobPath = `M120,-132.6C159.2,-109.4,190.9,-71.4,191.8,-30.3C192.7,10.7,162.7,53.8,128.3,81.7C93.9,109.6,55,122.3,17.3,111.9C-20.4,101.5,-40.7,68,-67.8,45.4C-94.9,22.8,-128.9,11.4,-144.6,-16.2C-160.3,-43.8,-157.6,-88.4,-131.7,-110.4C-105.8,-132.3,-56.8,-131.6,-21.7,-116.2C13.5,-100.8,26.9,-70.9,120,-132.6Z`;

const ProjectCard = ({ title, description, details, image, links, techStack = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [modalHue, setModalHue] = useState({ color: '', filter: '' });
  const cardRef = useRef(null);

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { color: blobFillColor, filter: lottieFilter } = useMemo(() => {
    const idx = Math.floor(Math.random() * huesWithFilters.length);
    return huesWithFilters[idx];
  }, []);

  const openModal = () => {
    setModalHue({ color: blobFillColor, filter: lottieFilter });
    setModalOpen(true);
  };

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -(y - centerY) / 20;
    const rotateY = (x - centerX) / 20;
    setRotation({ x: rotateX, y: rotateY });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    const node = cardRef.current;
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <>
      <div
        ref={cardRef}
        style={{
          ...styles.card(isSmallScreen),
          transform: `
            ${isVisible ? 'translateY(0)' : 'translateY(40px)'}
            ${isHovered ? 'scale(1.08)' : 'scale(1)'}
          `,
          opacity: isVisible ? 1 : 0,
          transition: 'transform 0.4s ease-out, opacity 0.5s ease-out',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openModal}
        onKeyPress={(e) => e.key === 'Enter' && setModalOpen(true)}
        role="button"
        tabIndex={0}
        onMouseMove={handleMouseMove}
      >
        <img
          src={jellyfishGif}
          alt="Animated blob"
          style={{
            ...styles.lottie,
            filter: lottieFilter,
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: 'transform 0.2s ease-out',
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
          <div style={styles.modalContent(isSmallScreen)} onClick={(e) => e.stopPropagation()}>
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
                  {links.map((linkObj, i) => (
                    <li key={i} style={styles.linkItem}>
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

// Styles
const styles = {
  card: (isSmall) => ({
    position: 'relative',
    width: isSmall ? 150 : 250,
    height: isSmall ? 150 : 250,
    borderRadius: isSmall ? 50 : 80,
    margin: isSmall ? 0 : 10,
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    willChange: 'transform',
  }),
  lottie: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    top: 0,
    left: 0,
    objectFit: 'cover',
    zIndex: 0,
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
  titleText: (isSmall) => ({
    fontSize: isSmall ? '0.6rem' : '1rem',
    fontWeight: '700',
    color: '#fff',
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
  modalContent: (isSmall) => ({
    position: 'relative',
    backgroundColor: '#001f2f',
    borderRadius: 30,
    padding: isSmall ? '25px 20px' : '40px 30px',
    boxShadow: '0 0 30px #00d2ff',
    color: '#a0eefd',
    maxWidth: '90%',
    maxHeight: '80vh',
    overflowY: 'auto',
  }),
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
  modalTitle: {
    fontSize: '1.8rem',
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
    fontSize: '1rem',
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
