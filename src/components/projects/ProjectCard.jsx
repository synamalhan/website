import React, { useState, useMemo , useEffect} from 'react';
import Lottie from 'lottie-react';
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
  { color: '#00a0ff', filter: 'hue-rotate(-90deg)' },
  { color: '#00c0ff', filter: 'hue-rotate(120deg)' },
  { color: '#00e4ff', filter: 'hue-rotate(135deg)' },
  { color: '#00b4ff', filter: 'hue-rotate(-105deg)' },
];

const blobPath = `M120,-132.6C159.2,-109.4,190.9,-71.4,191.8,-30.3C192.7,10.7,162.7,53.8,128.3,81.7C93.9,109.6,55,122.3,17.3,111.9C-20.4,101.5,-40.7,68,-67.8,45.4C-94.9,22.8,-128.9,11.4,-144.6,-16.2C-160.3,-43.8,-157.6,-88.4,-131.7,-110.4C-105.8,-132.3,-56.8,-131.6,-21.7,-116.2C13.5,-100.8,26.9,-70.9,120,-132.6Z`;

const ProjectCard = ({ title, description, details, image, links }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
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
  const [modalHue, setModalHue] = useState({ color: '', filter: '' });

  const openModal = () => {
    setModalHue({ color: blobFillColor, filter: lottieFilter });
    setModalOpen(true);
  };

  const blobSvg = (
    <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <g transform="translate(300,300)">
        <path d={blobPath} fill={modalHue.color} opacity="0.25" />
      </g>
    </svg>
  );

  
  return (
    <>
      <div
        style={{
          ...styles.card,
          boxShadow: 'none',
          transform: isHovered ? 'scale(1.3)' : 'scale(1)',
          transition: 'transform 0.3s ease-in-out',
        }}
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter') setModalOpen(true);
        }}
        >
        <img
          src={jellyfishGif}
          alt="Animated background"
          style={{ ...styles.lottie, filter: lottieFilter, opacity: 0.8 }}
          />

        <div style={styles.textOverlay}>
          <div style={styles.titleText}>{title}</div>
        </div>
      </div>

      {modalOpen && (
        <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={{ ...styles.blobWrapper }}>
              {[...Array(3)].map((_, i) => (
                <div
                key={i}
                style={{
                  ...styles.blobBackground,
                  top: -100 + i * 50,
                  left: -100 + i * 80,
                  transform: `scale(${1 - i * 0.2}) rotate(${i * 20}deg)`,
                  filter: modalHue.filter,
                }}
                >
                  <svg viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                    <g transform="translate(300,300)">
                      <path d={blobPath} fill={modalHue.color} opacity="0.2" />
                    </g>
                  </svg>
                </div>
              ))}
            </div>

            <button onClick={() => setModalOpen(false)} style={styles.closeButton} aria-label="Close modal">
              <X size={24} />
            </button>
            {/* {image && <img src={image} alt="Project" style={styles.modalLogo} />} */}
            <h2 style={styles.modalTitle}>{title}</h2>
            <p style={styles.modalDescription}>{description}</p>
            <div style={styles.modalDetails}>{details}</div>
            {links && links.length > 0 && (
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

const isSmallScreen = window.innerWidth < 500;

const styles = {
  card: {
    position: 'relative',
    width: isSmallScreen ? 150 : 200,
    height: isSmallScreen ? 150 : 200,
    margin: isSmallScreen ? 0 : 10,
    cursor: 'pointer',
    borderRadius: isSmallScreen ? 50 : 80,
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
    objectFit: isSmallScreen ? 'contain' : 'cover',
    top: 0,
    left: 0,
  },
  
  blobWrapper: {
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
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
    fontSize: isSmallScreen ? '0.6rem' : '1rem',
    fontWeight: '700',
    color: '#FFFFFF',
  },
  
  descText: {
    fontSize: '1.05rem',
    fontWeight: '500',
    color: '#95dffc',
  },
  logo: {
    height: 40,
    marginTop: 10,
    borderRadius: 10,
    objectFit: 'contain',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0, 15, 30, 0.75)', // darker blue-tinted overlay
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: '20px',
  },
  modalContent: {
    position: 'relative',
    backgroundColor: '#001f2f', // dark sea blue for depth
    borderRadius: 30,
    maxheight: '80%',
    maxWidth: '90%',
    padding: isSmallScreen ? '25px 20px 30px 20px' : '40px 30px 50px 50px',
    boxShadow: '0 0 30px #00d2ff',
    color: '#a0eefd',
    overflow: 'hidden',
    zIndex: 2,
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
    height: isSmallScreen ? 0 : 150,
    marginBottom: 20,
    borderRadius: 8,
    objectFit: 'contain',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: 1,
    position: 'relative',
  },
  modalTitle: {
    fontSize: isSmallScreen ? '1.3rem' : '2rem',
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
    fontSize: isSmallScreen ? '0.8rem' : '1.1rem',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
    position: 'relative',
    zIndex: 1,
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
