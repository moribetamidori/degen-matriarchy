'use client';

import React, { useState, useEffect } from 'react';
import { WomanProfile, influentialWomen } from "../data/influentialWomen";

interface Position {
  x: number;
  y: number;
}

interface Spectrum {
  xAxis: {
    left: string;
    right: string;
  };
  yAxis: {
    top: string;
    bottom: string;
  };
}

const WomenSpectrum: React.FC = () => {
  const [selectedWoman, setSelectedWoman] = useState<WomanProfile | null>(null);
  const [womenPositions, setWomenPositions] = useState<Map<number, Position>>(new Map());
  
  const [spectrum] = useState<Spectrum>({
    xAxis: {
      left: "Traditional",
      right: "Revolutionary"
    },
    yAxis: {
      top: "Scientific",
      bottom: "Artistic"
    }
  });

  // Move random position generation to useEffect
  useEffect(() => {
    const positions = new Map(
      influentialWomen.map(woman => [
        woman.id,
        {
          x: Math.random() * 80 + 10, // 10-90% to keep within bounds
          y: Math.random() * 80 + 10
        }
      ])
    );
    setWomenPositions(positions);
  }, []); // Empty dependency array means this runs once on mount

  const renderSpectrum = () => (
    <div className="relative w-full h-full border border-[#1c41f1] rounded-lg p-8">
      {/* Axis lines */}
      <div className="absolute left-1/2 top-0 bottom-0 border-l border-[#1c41f1] opacity-30" />
      <div className="absolute top-1/2 left-0 right-0 border-t border-[#1c41f1] opacity-30" />

      {/* Axis labels */}
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-[#1c41f1]">
        {spectrum.yAxis.top}
      </div>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[#1c41f1]">
        {spectrum.yAxis.bottom}
      </div>
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-[#1c41f1]">
        {spectrum.xAxis.left}
      </div>
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#1c41f1]">
        {spectrum.xAxis.right}
      </div>

      {/* Women dots */}
      {Array.from(womenPositions.entries()).map(([id, position]) => {
        const woman = influentialWomen.find(w => w.id === id);
        if (!woman) return null;

        return (
          <button
            key={id}
            onClick={() => setSelectedWoman(woman)}
            className="absolute w-3 h-3 transform -translate-x-1/2 -translate-y-1/2 
                     border border-[#1c41f1] rounded-full hover:bg-[#1c41f1] 
                     transition-colors duration-200"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`
            }}
          >
            <div className="absolute left-1/2 bottom-full mb-2 transform -translate-x-1/2
                          opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap
                          text-[#1c41f1] text-sm">
              {woman.name}
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="h-[80vh] p-4">
      <div className="flex h-full gap-4">
        <div className="flex-1">
          {renderSpectrum()}
        </div>
        
        {selectedWoman && (
          <div className="w-80 border border-[#1c41f1] rounded-lg p-4">
            <h2 className="text-xl font-bold text-[#1c41f1] mb-2">
              {selectedWoman.name}
            </h2>
            <p className="text-[#1c41f1] mb-4">{selectedWoman.description}</p>
            <div className="text-[#1c41f1] text-sm">
              {selectedWoman.field} • {selectedWoman.birthYear}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenSpectrum; 