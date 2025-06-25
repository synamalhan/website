import React, { useState, useEffect } from 'react';
import ship from '../../assets/ship.webp';
import oceanOverlay from '../../assets/ocean.png'; // 🔹 Import your overlay image

const hobbies = [
  'Building Metal Earth Models',
  'Swimming',
  'Marine Life',
  'Coding'
];

const FinalSection = () => {
  const [showHobbies, setShowHobbies] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isSmall = windowWidth < 768;

  return (
    <section
      id="final-section"
      style={{
        background: 'linear-gradient(180deg, #000608 0%, #000000 100%)',
        margin: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        minHeight: '700px',
        fontFamily: "'Montserrat', sans-serif",
        color: '#92daf7',
        userSelect: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Centered Ship with hobby bubble */}
      <div
        style={{
          position: 'relative',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
          maxWidth: '700px',
          justifyContent: 'flex-end',
          marginLeft: '30px',
          marginRight: '30px',
        }}
      >
        {/* Ocean overlay on top of ship */}
        <img
          src={oceanOverlay}
          alt="Ocean Overlay"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',     // 🔹 Ensure it spans full width of viewport
            height: '100%',     // 🔹 Covers the entire ship container height
            objectFit: 'cover',
            opacity: 0.2,      // 🔹 Very subtle opacity
            pointerEvents: 'none',
            zIndex: 2,
          filter: 'grayscale(100%) brightness(0.8) contrast(1.2)',
    mixBlendMode: 'screen', // optional: blend better with background
  }}
/>

        <img
          src={ship}
          alt="Ship"
          style={{
            height: isSmall ? '300px' : '700px',
            top:150,
            filter: 'hue-rotate(190deg)',
            zIndex: 1,
            opacity: 0.3,
            position: 'relative',
          }}
          onClick={() => {
            setShowHobbies(!showHobbies);
          }}
        />

        {/* Hobby bubble */}
        {showHobbies && (
          <div
            style={{
              position: 'absolute',
              bottom: isSmall ? '300px' : '100px',
              left: isSmall ? '0%' : '100%',
              transform: isSmall ? 'translateX(-100%)' : 'none',
              background: 'rgba(10, 62, 87, 0.95)',
              borderRadius: '15px',
              padding: '25px 35px',
              boxShadow: '0 0 25px rgba(146, 218, 247, 0.9)',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation: 'fadeInRight 0.3s ease forwards',
              fontSize: '1.1rem',
              lineHeight: 1.5,
              zIndex: 10,
              color: '#92daf7',
              opacity: 1,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: '1.4rem',
                fontWeight: '600',
                borderBottom: '1px solid #4a9bdc',
                paddingBottom: '6px',
              }}
            >
              Hobbies and Interests
            </h3>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '10px',
              }}
            >
              {hobbies.map((hobby, idx) => (
                <span
                  key={idx}
                  style={{
                    background: '#0a3e57',
                    padding: '10px 18px',
                    borderRadius: '20px',
                    boxShadow: '0 0 10px #4a9bdc',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Empty space to balance layout */}
      <div style={{ width: isSmall ? '40px' : '160px', marginRight: isSmall ? '10px' : '30px' }} />

      {/* Animation */}
      <style>
        {`
          @keyframes fadeInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default FinalSection;
