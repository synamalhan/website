import React, { useState } from 'react';
import Lottie from 'lottie-react';
import fishAnimation from '../../assets/fish.json';
import { useRef } from 'react';


const FloatingFishResume = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const fishRef = useRef(null);


  const resumeEmbedUrl = "https://drive.google.com/file/d/1dWooWYa7-TuPjlG9GcKVrJMTFEIs21nS/preview";
  const resumeDownloadUrl = "https://drive.google.com/uc?export=download&id=1dWooWYa7-TuPjlG9GcKVrJMTFEIs21nS";

  const handleClick = () => {

    // Start download
    const link = document.createElement('a');
    link.href = resumeDownloadUrl;
    link.download = 'Syna_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show modal
    setShowModal(true);
  };

  const handleMouseMove = (e) => {
    const fish = fishRef.current;
    if (fish) {
      const rect = fish.getBoundingClientRect();
      const fishCenterY = rect.top + rect.height / 2;
      const deltaY = e.clientY - fishCenterY;

      // Normalize to a range of -1 to 1 (assume 100px is max movement above/below)
      let normalized = deltaY / 100;
      normalized = Math.max(-1, Math.min(1, normalized)); // clamp

      const maxRotation = 20; // degrees
      const angle = -normalized * maxRotation;

      setRotation(angle);
    }
  };



  return (
    <>
      <div
        ref={fishRef}
        style={styles.container}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => {
          setOpen(false);
          setRotation(0);
        }}
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        aria-label="Floating fish with downloadable resume"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => { if (e.key === 'Enter') handleClick(); }}
      >



        <div style={styles.lottieWrapper}>
          <Lottie
            animationData={fishAnimation}
            loop
            style={{
              ...styles.lottie,
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          />

          {open && (
            <div style={styles.resumeLink}>Download Resume</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <iframe
              src={resumeEmbedUrl}
              title="Resume Preview"
              width="100%"
              height="100%"
              allow="autoplay"
              style={{ border: 'none' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '350px',
    height: '400px',
    cursor: 'pointer',
    userSelect: 'none',
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieWrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  lottie: {
  width: '100%',
  height: '100%',
  transformOrigin: '50% 50%', // Right center
  pointerEvents: 'none',
},
  resumeLink: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // background: 'rgba(0, 0, 0, 0.1)',
    textShadow: '2px 2px 6px rgba(0,0,0,1)',
    color: '#ffffff',
    // textDecoration: 'underline',
    fontWeight: 'bold',
    fontFamily: "'Montserrat', sans-serif",
    padding: '8px 16px',
    borderRadius: '8px',
    zIndex: 10,
    pointerEvents: 'none',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalContent: {
    width: '80%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
  },
};

export default FloatingFishResume;
