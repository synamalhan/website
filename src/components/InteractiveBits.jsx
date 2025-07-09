// src/components/InteractiveBits/InteractiveBits.jsx
import React from 'react';
import Ballpit from './reactbits/BallPit';
import MetaBalls from './reactbits/MetaBalls';

export default function InteractiveBits() {
  return (
    <section id="interactive" className="py-20 bg-[#f9fafb] text-gray-800">
      <div className="max-w-6xl mx-auto px-6 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600">
          Interactive Bits
        </h2>
        <p className="text-center text-gray-600 max-w-xl mx-auto">
          Explore bite-sized interactive experiences built with React and canvas — a blend of creativity, logic, and fun.
        </p>

        {/* MetaBalls Container (Top) */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h3 className="font-semibold text-lg mb-4">MetaBalls Interaction</h3>
          <div className="w-full" style={{ height: '400px' }}>
            <MetaBalls
              color="#ff6b6b"
              cursorBallColor="#5227FF"
              cursorBallSize={2}
              ballCount={15}
              animationSize={30}
              enableMouseInteraction={true}
              enableTransparency={true}
              hoverSmoothness={0.05}
              clumpFactor={1}
              speed={0.3}
            />
          </div>
        </div>

        {/* Ballpit Container (Bottom) */}
        <div className="bg-white rounded-xl shadow-lg p-6 w-full">
          <h3 className="font-semibold text-lg mb-4">Colorful Ball Pit</h3>
          <div className="w-full" style={{ height: '400px' }}>
            <Ballpit
              count={200}
              gravity={0.5}
              friction={0.9975}
              wallBounce={0.95}
              followCursor={true}
              colors={["#ff007f", "#00ffff", "#ffea00", "#ff6b6b", "#00ff00"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}