import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import crabJson from '../../assets/crab.json';
import profile from '../../assets/profile.jpeg';

const CrabOverlay = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    setShowMessage(prev => !prev);
  };

  const isSmallScreen = windowWidth < 768;
  const maxTop = window.innerHeight - 160;
  const topPosition = Math.min(250 + scrollY * 0.1, maxTop);

  return (
    <>
      {/* Crab Button */}
      <div
        onClick={handleClick}
        style={{
          position: 'fixed',
          bottom: isSmallScreen ? '0px' : 'auto',
          top: isSmallScreen ? 'auto' : topPosition,
          right: '0px',
          width: isSmallScreen ? '100px' : '160px',
          height: isSmallScreen ? '100px' : '160px',
          cursor: 'pointer',
          opacity: 0.7,
          zIndex: 9999,
          filter: showMessage ? 'hue-rotate(90deg)' : 'hue-rotate(250deg)',
          transition: 'filter 0.5s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          userSelect: 'none',
        }}
        aria-label="Crab overlay"
      >
        <Lottie animationData={crabJson} loop={true} />
      </div>

      {/* Popover UI (Empty Shell) */}
      {showMessage && (
        <div
          style={{
            position: 'fixed',
            top: isSmallScreen ? 'auto' : topPosition - 230,
            bottom: isSmallScreen ? '100px' : 'auto',
            right: isSmallScreen ? '20px' : '100px',
            width: isSmallScreen ? '90%' : '340px',
            background: 'rgba(10, 62, 87, 0.95)',
            padding: '16px',
            borderRadius: '16px',
            boxShadow: '0 0 25px rgba(146, 218, 247, 0.9)',
            fontSize: isSmallScreen ? '0.85rem' : '1rem',
            color: '#92daf7',
            zIndex: 10000,
            userSelect: 'text',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <img
              src={profile}
              alt="Profile"
              style={{
                width: isSmallScreen ? '40px' : '50px',
                height: isSmallScreen ? '40px' : '50px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
            <p style={{ margin: 0 }}>Hi, I'm Syna, nice to meet you!.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CrabOverlay;
