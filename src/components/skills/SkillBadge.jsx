import React, { useMemo, useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import starfishAnimation from '../../assets/starfish.json';

const generateRandomBlob = () => {
  const borderRadius = `${Math.floor(Math.random() * 50) + 50}% ${Math.floor(Math.random() * 50) + 50}% ${
    Math.floor(Math.random() * 50) + 50
  }% ${Math.floor(Math.random() * 50) + 50}%`;
  return { borderRadius };
};

const categoryColors = {
  'Programming Languages': ['#FF6B6B', '#FF8E8E', '#FFB3B3'],
  'Frontend Development': ['#4ECDC4', '#6ED5CE', '#8EDDD8'],
  'Backend & Database': ['#45B7D1', '#6BC5D8', '#91D3DF'],
  'AI & Machine Learning': ['#96CEB4', '#A8D5C4', '#BADCD4'],
  'Cloud & DevOps': ['#FFEAA7', '#FFF0B8', '#FFF6C9'],
  'Tools & Others': ['#DDA0DD', '#E6B3E6', '#EFC6EF']
};

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

const SkillCard = ({ skill, level, category }) => {
  const { borderRadius } = useMemo(generateRandomBlob, []);
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const updateScreen = () => setIsSmallScreen(window.innerWidth < 600);
    updateScreen();
    window.addEventListener('resize', updateScreen);
    return () => window.removeEventListener('resize', updateScreen);
  }, []);

  const colors = categoryColors[category] || categoryColors['Tools & Others'];
  const background = colors[Math.floor(Math.random() * colors.length)];

  return (
    <>
      <style>{shakeKeyframes}</style>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${background}, ${colors[(colors.indexOf(background) + 1) % colors.length]})`,
          borderRadius,
          padding: isSmallScreen ? '12px 8px' : '20px 16px',
          minHeight: '60px',
          color: '#00171cc',
          fontSize: isSmallScreen ? '0.75rem' : '0.9rem',
          fontWeight: '600',
          boxShadow: isHovered 
            ? '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' 
            : '0 4px 15px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: isHovered ? 'shake 0.8s infinite' : 'none',
          transform: isHovered ? 'translateY(-2px) scale(1.05)' : 'translateY(0) scale(1)',
        }}
      >
        <div className="text-center font-semibold mb-2">{skill}</div>
        {/* Fix: Arrange stars horizontally with row direction */}
<div
  className="flex gap-1"
  style={{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {Array.from({ length: level }).map((_, i) => (
    <div
      key={i}
      style={{
        width: isSmallScreen ? '12px' : '16px',
        height: isSmallScreen ? '12px' : '16px',
      }}
    >
      <Lottie 
        animationData={starfishAnimation} 
        loop 
        autoplay 
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  ))}
</div>
        
        {/* Subtle glow effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${background}, transparent 70%)`,
            borderRadius,
          }}
        />
      </div>
    </>
  );
};

export default SkillCard;