import React, { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Lottie from 'lottie-react';
import { X } from 'lucide-react';

import bubbleAnimation from '../../assets/bubblesnew.json';
import bubblesGif from '../../assets/bubbles.gif';
import bubbles3D from '../../assets/bubble3d.gif';

const hues = [
  { color: 'hsl(210, 70%, 60%)', filter: 'hue-rotate(0deg)' },
  { color: 'hsl(230, 70%, 60%)', filter: 'hue-rotate(20deg)' },
  { color: 'hsl(250, 70%, 60%)', filter: 'hue-rotate(40deg)' },
  { color: 'hsl(270, 80%, 65%)', filter: 'hue-rotate(60deg)' },
  { color: 'hsl(280, 80%, 55%)', filter: 'hue-rotate(80deg)' },
];

const WorkExperienceCard = ({ title, company, duration, summary, details, logo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const hueFilter = useMemo(() => hues[Math.floor(Math.random() * hues.length)], []);
  const ref = useRef(null);
  const inView = useInView(ref, { threshold: 0.3, triggerOnce: false });

  return (
    <>
      {/* Ripple Animation */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(-50px) scale(1); opacity: 0.2; }
          50% { transform: translateY(-120px) scale(1.1); opacity: 0.4; }
          100% { transform: translateY(-250px) scale(1); opacity: 0; }
        }
        .hover-ripple:hover::after {
          content: '';
          position: absolute;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: rippleEffect 0.6s ease-out;
          pointer-events: none;
        }
        @keyframes rippleEffect {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(1.8); opacity: 0; }
        }
      `}</style>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="hover-ripple"
        style={{
          position: 'relative',
          width: 280,
          height: 280,
          cursor: 'pointer',
          background: 'transparent',
        }}
        onClick={() => setModalOpen(true)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Layered Animations */}
        <motion.img
          src={bubbles3D}
          alt="3D bubbles"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: hueFilter.filter,
            transform: 'translate(-50%, 0%) rotate(-70deg)',
            opacity: hovered ? 0.5 : 0.35,
            transition: 'opacity 0.5s ease',
          }}
        />
        <motion.img
          src={bubblesGif}
          alt="Background bubbles"
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, 0%)',
            opacity: hovered ? 0.15 : 0.1,
            transition: 'opacity 0.5s ease',
          }}
        />
        <motion.div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: hovered ? 0.5 : 0.7,
            pointerEvents: 'none',
            filter: hueFilter.filter,
          }}
        >
          <Lottie animationData={bubbleAnimation} loop autoplay />
        </motion.div>

        {/* Centered Content */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            color: '#ffffff',
            padding: '10px 15px',
            display: 'flex',
            transform: 'translateY(30px)',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            textShadow: '1px 1px 4px rgba(0,0,0,0.6)',
          }}
        >
          <img src={logo} alt="Logo" style={{ height: 40, marginBottom: 8 }} />
          <div style={{ fontSize: '1.3rem', fontWeight: '700' }}>{title}</div>
          <div style={{ fontSize: '1rem', fontWeight: '600', color: '#b4eaff' }}>{company}</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '500', color: '#9cd3e7' }}>{duration}</div>
        </div>
      </motion.div>

      {/* Modal */}
      {modalOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 10, 15, 0.9)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            padding: 20,
          }}
          onClick={() => setModalOpen(false)}
        >
          <motion.div
            style={{
              position: 'relative',
              background: 'rgba(0, 40, 50, 0.7)',
              borderRadius: 30,
              padding: '40px 30px',
              width: '90%',
              maxWidth: 700,
              boxShadow: '0 0 60px rgba(0,200,255,0.3)',
              color: '#d6f6ff',
              backdropFilter: 'blur(12px)',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Floating Bubbles Inside Modal */}
            {Array.from({ length: 12 }).map((_, i) => {
              const size = Math.random() * 30 + 20;
              const left = Math.random() * 100;
              const duration = Math.random() * 8 + 6;
              const delay = Math.random() * 6;
              return (
                <motion.div
                  key={`modal-bubble-${i}`}
                  style={{
                    position: 'absolute',
                    bottom: '-60px',
                    left: `${left}%`,
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    backgroundColor: hueFilter.color,
                    opacity: 0.2,
                    filter: 'blur(2px)',
                    animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`,
                    zIndex: 0,
                  }}
                />
              );
            })}

            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'transparent',
                border: 'none',
                color: '#a0d8ef',
                cursor: 'pointer',
              }}
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <img
                src={logo}
                alt="Modal Logo"
                style={{
                  height: 60,
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto 20px',
                }}
              />
              <h2 style={{ fontSize: '2.3rem', textAlign: 'center', color: '#ffffff', marginBottom: '12px' }}>{title}</h2>
              <p
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '400',
                  marginBottom: 20,
                  color: '#c8efff',
                  textAlign: 'center',
                }}
              >
                {summary}
              </p>
              <div
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  whiteSpace: 'pre-wrap',
                  color: '#e3f9ff',
                  textAlign: 'left',
                }}
              >
                {details}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default WorkExperienceCard;
