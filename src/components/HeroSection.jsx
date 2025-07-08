import React from 'react';
import { motion } from 'framer-motion';
import Particles from './Particles'; // Adjust the path if needed

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-[#f7f8f9] text-gray-800 overflow-hidden" id="home">
      {/* Purple Particle Background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#a78bfa', '#c084fc', '#d8b4fe']} // lavender to soft violet tones
          particleCount={1000}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Hi, I'm Syna 👋</h1>
        <p className="mt-4 text-lg text-gray-700 max-w-xl mx-auto">
          I build AI, data science, and full-stack apps — blending beauty with brains ✨
        </p>
        <a
          href="#projects"
          className="inline-block mt-8 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >
          View My Work
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
