import React from 'react';

const AboutSection = () => {
  return (
    <section className="relative py-20 bg-white text-gray-800" id="about">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">About Me</h2>
        <p className="text-lg leading-relaxed text-gray-700">
          I'm <span className="font-semibold text-gray-900">Syna Malhan</span>, a passionate developer and problem-solver driven by curiosity and creativity. 
          With a strong background in <span className="text-purple-600 font-medium">AI, data science, and full-stack development</span>, I love building intelligent systems 
          that are both functional and beautiful. Whether it's designing user-centric interfaces, optimizing machine learning models, 
          or crafting scalable backend logic — I thrive at the intersection of code and impact.
        </p>

        <p className="text-lg leading-relaxed text-gray-700 mt-6">
          Outside of code, I'm constantly exploring ways to bring ideas to life — through research, hackathons, or passion projects. 
          I believe in building tools that matter and in making technology more accessible, empathetic, and human.
        </p>

        <a
          href="#experience"
          className="inline-block mt-10 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
        >
          Explore My Experience
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
