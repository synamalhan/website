// src/components/ExperienceSection.jsx
import React from 'react';
import experiences from '../data/experiences';
import { motion } from 'framer-motion';
import SpotlightCard from './reactbits/SpotlightCard';

const spotlightColors = [
  'rgba(167, 139, 250, 0.2)',
  'rgba(99, 102, 241, 0.2)',
  'rgba(34, 211, 238, 0.2)',
  'rgba(251, 191, 36, 0.2)',
  'rgba(244, 114, 182, 0.2)',
  'rgba(16, 185, 129, 0.2)',
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 sm:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900">
          Work Experience
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp, index) => {
            const bg = spotlightColors[index % spotlightColors.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <SpotlightCard spotlightColor={bg}>
                  <div className="flex flex-col items-start gap-4">
                    {exp.logo && (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="w-16 sm:w-20 object-contain"
                      />
                    )}
                    <div>
                      <h3 className="text-md sm:text-lg font-semibold leading-tight">
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
