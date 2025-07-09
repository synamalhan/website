import React from 'react';
import { motion } from 'framer-motion';
import Particles from './reactbits/Particles'; // Adjust the path if needed
import TiltedCard from './reactbits/TiltedCard';

const cards = [
    {
      title: "About Me",
      text: "Curious technologist, passionate about building meaningful tools with ML and design. Learn about my story, philosophy, and values.",
      link: "#about",
      gradient: ["#8B5CF6", "#4F46E5", "#312E81"],
    },
    {
      title: "Projects",
      text: "Dive into projects built with React, Python, Swift, and AI/ML — including OCR tools, RAG chatbots, emotion-aware UIs, and full-stack dashboards.",
      link: "#projects",
      gradient: ["#06B6D4", "#0E7490", "#164E63"],
    },
    {
      title: "Experience",
      text: "Internships and fellowships in GenAI, CV, forecasting, and frontend at Infinite Uptime, EY, ASU, JSPL, Ripik.AI, and Headstarter.",
      link: "#experience",
      gradient: ["#F59E0B", "#B45309", "#78350F"],
    },
    {
      title: "Contact Me",
      text: "I'm always open to meaningful conversations, freelance work, or collaborating on impactful AI projects. Feel free to drop a message!",
      link: "#contact",
      gradient: ["#EC4899", "#DB2777", "#831843"],
    },
  ];

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-[#f7f8f9] text-gray-800 " id="home">
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
        {/* Tilted Summary Cards */}
<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 px-4">

        {cards.map((card, idx) => (
          <a key={idx} href={card.link} className="block">
            <TiltedCard
              containerHeight="240px"
              containerWidth="100%"
              overlayHeader={card.title}
              overlayText={card.text}
              overlayLink={card.link}
              overlayLinkText="Explore →"
              gradientColors={card.gradient}
              scaleOnHover={1.15}
              rotateAmplitude={30}
            />
          </a>
        ))}
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
