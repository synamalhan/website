import React, { useState } from 'react';
import Lottie from 'lottie-react';
import fishAnimation from '../../assets/fish.json';
import { useRef } from 'react';


const FloatingFishResume = () => {
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rotation, setRotation] = useState(0);
  const fishRef = useRef(null);


  const resumeUrl = "/resume.pdf"; // Resume stored in public folder

  const handleClick = () => {
  // Open static resume.pdf from public folder
  window.open(`${process.env.PUBLIC_URL}/resume.pdf`, '_blank');

  // Optional: Show preview modal
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
  filter: 'hue-rotate(-115deg)',    
  transform: 'rotate(-15deg)',

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
