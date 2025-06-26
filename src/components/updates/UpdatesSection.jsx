import React from 'react';
import { motion } from 'framer-motion';
import UpdateCard from './UpdateCard';
import updates from './updates';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const UpdatesSection = () => {
  return (
    <motion.section
      id="updates"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
      style={{
        background: 'linear-gradient(180deg, #00141a 0%, #00141a 100%)',
        minHeight: '60vh',
        padding: '48px 20px 32px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#a0d8ef',
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <motion.h2
        variants={itemVariants}
        style={{
          fontSize: '2.5rem',
          marginBottom: '18px',
          color: '#92daf7',
          textShadow: '2px 2px 6px rgba(128, 128, 128, 0.8)',
          textAlign: 'center',
        }}
      >
        What's Happening Now
      </motion.h2>
      <motion.p
        variants={itemVariants}
        style={{ maxWidth: '600px', textAlign: 'center', marginBottom: '32px', fontSize: '1.1rem' }}
      >
        Short updates, thoughts, and progress logs. Check back often for the latest!
      </motion.p>
      <motion.div
        variants={containerVariants}
        style={{ width: '100%', maxWidth: '540px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        {updates.map((update, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <UpdateCard {...update} />
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default UpdatesSection; 