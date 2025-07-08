import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full backdrop-blur bg-white/70 border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-purple-700">Syna Malhan</h1>
        <ul className="hidden md:flex space-x-6 text-sm font-medium">
          <li><a href="#about" className="hover:text-purple-600 transition">About</a></li>
          <li><a href="#experience" className="hover:text-purple-600 transition">Experience</a></li>
          <li><a href="#projects" className="hover:text-purple-600 transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-purple-600 transition">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
