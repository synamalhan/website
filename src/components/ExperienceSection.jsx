// src/components/ExperienceSection.jsx
import React from 'react';
import experiences from '../data/experiences';
import { motion } from 'framer-motion';
import SpotlightCard from './SpotlightCard';

// Define a palette of soft spotlight colors
const spotlightColors = [
  'rgba(167, 139, 250, 0.2)', // soft purple
  'rgba(99, 102, 241, 0.2)',  // indigo
  'rgba(34, 211, 238, 0.2)',  // cyan
  'rgba(251, 191, 36, 0.2)',  // amber
  'rgba(244, 114, 182, 0.2)', // pink
  'rgba(16, 185, 129, 0.2)'   // green
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Work Experience</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const randomColor = spotlightColors[index % spotlightColors.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SpotlightCard spotlightColor={randomColor}>
  <div className="flex flex-col items-start gap-4">
    {exp.logo && (
      <img
        src={exp.logo}
        alt={exp.company}
        className="w-20 object-contain"
      />
    )}
    <div>
      <h3 className="text-lg font-semibold leading-tight">
        {exp.title}{' '}
        <span className="text-sm text-gray-500">– {exp.company}</span>
      </h3>
      <p className="text-xs text-gray-400 mb-2">{exp.duration}</p>
      <p className="text-sm text-gray-700">{exp.summary}</p>
      <div className="mt-2 text-sm text-gray-700 leading-snug space-y-1">
        {exp.details}
      </div>
    </div>
  </div>
</SpotlightCard>

              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
