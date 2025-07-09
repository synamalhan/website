import React from 'react';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import profile from '../assets/profile.jpeg'; // Update path if needed
import resume from '../assets/resume.pdf';

const AboutSection = () => {
  return (
    <section className="relative py-16 sm:py-20 bg-white text-gray-800" id="about">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Side: Bio and Fun Fact */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-purple-600">About Me</h2>

          <p className="text-base sm:text-lg leading-relaxed text-gray-700">
            I'm <span className="font-semibold text-gray-900">Syna Malhan</span>, a passionate developer and problem-solver driven by curiosity and creativity. 
            With a strong background in <span className="text-purple-600 font-medium">AI, data science, and full-stack development</span>, 
            I love building intelligent systems that are both functional and beautiful.
          </p>

          <p className="text-base sm:text-lg leading-relaxed text-gray-700 mt-4">
            Outside of code, I explore ways to bring ideas to life — through research, hackathons, or passion projects. 
            I believe in building tools that are accessible, empathetic, and human.
          </p>

          {/* Fun Fact */}
          <div className="mt-6 flex items-start gap-2 text-sm text-purple-700 bg-purple-50 px-4 py-3 rounded-lg shadow-sm">
            <WrenchScrewdriverIcon className="w-5 h-5 text-purple-500 mt-[2px]" />
            <p>
              <strong>Fun Fact:</strong> I like to build Metal Earth models — tiny, intricate 3D puzzles made from laser-cut metal sheets 🔧🧩
            </p>
          </div>

          {/* Download Resume Button */}
          <a
            href={resume}
            download
            className="inline-block mt-6 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Download My Resume
          </a>
        </div>

        {/* Right Side: Photo + Spotify */}
        <div className="flex flex-col items-center gap-6">
          {/* Profile Image */}
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden shadow-lg border-4 border-purple-200">
            <img
              src={profile}
              alt="Syna Malhan"
              className="object-cover w-full h-full"
            />
          </div>

          {/* Spotify Embed */}
          <div className="w-full max-w-md rounded-lg overflow-hidden shadow-md">
            <iframe
              title="Spotify"
              src="https://open.spotify.com/embed/playlist/4Z9i9PdzJUoAsDzeXZZnyy?utm_source=generator"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
