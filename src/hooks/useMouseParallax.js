import { useEffect, useState } from 'react';

/**
 * useMouseParallax - returns x and y offsets for parallax effect based on mouse position.
 * @param {number} depth - How much the element should move (higher = more movement)
 * @returns {{ x: number, y: number }}
 */
const useMouseParallax = (depth = 0.05) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize mouse position to range [-1, 1]
      const x = ((e.clientX / innerWidth) - 0.5) * 2;
      const y = ((e.clientY / innerHeight) - 0.5) * 2;
      setOffset({
        x: x * depth * 100, // scale for px movement
        y: y * depth * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [depth]);

  return offset;
};

export default useMouseParallax; 