// File: src/components/Footer.tsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-10 text-gray-500 text-sm" id="contact">
      <p>© {new Date().getFullYear()} Syna Malhan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
