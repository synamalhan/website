import React, { useMemo } from 'react';

// Utility to generate a funky border-radius
const generateBlobRadius = () => {
  const rand = () => Math.floor(Math.random() * 40 + 30);
  return `${rand()}% ${rand()}% ${rand()}% ${rand()}% / ${rand()}% ${rand()}% ${rand()}% ${rand()}%`;
};

const UpdateCard = ({ title, date, content }) => {
  const borderRadius = useMemo(generateBlobRadius, []);

  return (
    <div
      style={{
        background: 'radial-gradient(circle at top left, #003843, #00171c)',
        borderRadius: borderRadius,
        boxShadow: '0 10px 30px rgba(0, 64, 80, 0.35)',
        padding: '26px',
        margin: '20px 0',
        color: '#d2f3f9',
        maxWidth: '540px',
        width: '100%',
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        border: '2px solid rgba(0, 150, 200, 0.2)',
        backdropFilter: 'blur(6px)',
        transform: 'rotate(-1deg)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(0deg) translateY(-4px) scale(1.01)';
        e.currentTarget.style.boxShadow = '0 14px 34px rgba(0, 100, 120, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotate(-1deg)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 64, 80, 0.35)';
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{
          margin: 0,
          fontSize: '1.35rem',
          color: '#88e1f2',
          fontWeight: 600,
          letterSpacing: '0.3px',
        }}>
          {title}
        </h3>
        <span style={{
          fontSize: '0.9rem',
          color: '#7ecce2',
          fontWeight: 500,
          fontStyle: 'italic',
        }}>
          {date}
        </span>
      </div>
      <p style={{
        marginTop: '14px',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        color: '#c2f0fa',
        textShadow: '0 0 2px rgba(0, 60, 70, 0.2)',
      }}>
        {content}
      </p>
    </div>
  );
};

export default UpdateCard;
