// src/components/MacbookWrapper.jsx
import React from 'react';

export default function MacbookWrapper({ children }) {
  return (
    <div className="w-full max-w-7xl mx-auto mt-10 mb-20 px-6 md:px-12">
      <div className="rounded-3xl shadow-2xl border-[14px] border-gray-300 bg-black/40 backdrop-blur-lg overflow-hidden relative">
        {/* Mac window buttons */}
        <div className="absolute top-2 left-4 flex space-x-2 z-10">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        {/* Screen */}
        <div className="bg-white rounded-t-none rounded-b-3xl p-6 md:p-10">
          {children}
        </div>
      </div>
    </div>
  );
}
