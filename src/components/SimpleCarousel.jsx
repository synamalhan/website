import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../theme/ThemeContext';
import { FONTS } from './styles';

const defaultItems = [
  {
    image: 'https://picsum.photos/900/900?grayscale',
    title: 'DEVELOPER',
    description: 'Engineering the digital future.'
  }
];

export default function SimpleCarousel({ items = [] }) {
  const { theme: t } = useTheme();
  const displayItems = items.length ? items : defaultItems;
  const [index, setIndex] = useState(0);

  const nextItem = () => setIndex((prev) => (prev + 1) % displayItems.length);
  const prevItem = () => setIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Main image container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '70%',
        maxWidth: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            style={{ width: '100%', height: '100%', position: 'relative' }}
          >
            <img
              src={displayItems[index].image}
              alt={displayItems[index].title}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '16px',
                border: `1px solid ${t.border}`,
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                objectFit: 'cover'
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Overlays */}
        <button
          onClick={prevItem}
          style={{
            position: 'absolute',
            left: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
        >
          ←
        </button>
        <button
          onClick={nextItem}
          style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `1px solid ${t.border}`,
            cursor: 'pointer',
            zIndex: 2,
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.6)'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)'}
        >
          →
        </button>
      </div>

      {/* Caption */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <h3 style={{
              color: t.textHi,
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              margin: 0,
              ...FONTS.orb
            }}>
              {displayItems[index].title}
            </h3>
            <p style={{
              color: t.textMute,
              fontSize: '0.75rem',
              marginTop: '6px',
              maxWidth: '240px',
              margin: '6px auto 0 auto',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              ...FONTS.mono
            }}>
              {displayItems[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Simple dots */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', justifyContent: 'center' }}>
          {displayItems.map((_, i) => (
            <div
              key={i}
              style={{
                height: '4px',
                borderRadius: '2px',
                transition: 'all 0.3s ease',
                backgroundColor: i === index ? t.accent : `${t.textMute}33`,
                width: i === index ? '20px' : '6px'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}