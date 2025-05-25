import React, { useMemo, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import starfishAnimation from '../../assets/starfish.json';

const generateRandomBlob = () => {
  const borderRadius = `${Math.floor(Math.random() * 50) + 25}% ${Math.floor(Math.random() * 50) + 25}% ${
    Math.floor(Math.random() * 50) + 25
  }% ${Math.floor(Math.random() * 50) + 25}%`;
  const colors = ['#6e64ff', '#7f7bff', '#7158e2', '#5f7eff', '#7d60f6', '#7aa2ff', '#8b7dff'];
  const background = colors[Math.floor(Math.random() * colors.length)];
  return { borderRadius, background };
};

// Slower shake animation
const shakeKeyframes = `
  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
  }
`;

const SkillCard = ({ skill, level }) => {
  const { borderRadius, background } = useMemo(generateRandomBlob, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreen = () => setIsSmallScreen(window.innerWidth < 600);
    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  return (
    <>
      <style>{shakeKeyframes}</style>

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background,
          borderRadius,
          padding: isSmallScreen ? '15px 10px' : '30px 20px',
          minHeight: '80px',
          color: '#fff',
          fontFamily: "'Montserrat', sans-serif",
          fontSize: isSmallScreen ? '0.8rem' : '1.2rem',
          fontWeight: 'bold',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'transform 0.3s ease-in-out',
          animation: isHovered ? 'shake 1s infinite' : 'none',
        }}
      >
        <div>{skill}</div>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            gap: isSmallScreen ? '1px' : '4px',
          }}
        >
          {Array.from({ length: level }).map((_, i) => (
            <div
              key={i}
              style={{
                width: isSmallScreen ? '15px' : '30px',
                height: isSmallScreen ? '15px' : '30px',
              }}
            >
              <Lottie animationData={starfishAnimation} loop autoplay />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkillCard;
