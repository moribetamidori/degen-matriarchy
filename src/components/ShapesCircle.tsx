import React from 'react';
import Shape from './Shape';

interface ShapesCircleProps {
  radius: number;
  centerX: number;
  centerY: number;
}

const ShapesCircle: React.FC<ShapesCircleProps> = ({ radius, centerX, centerY }) => {
  const shapes = [
    { 
      type: 'tetrahedron' as const,
      label: 'Tetrahedron',
      content: <div className="text-[#1c41f1]">4 Faces</div>
    },
    { 
      type: 'cube' as const,
      label: 'Cube',
      content: <div className="text-[#1c41f1]">6 Faces</div>
    },
    { 
      type: 'octahedron' as const,
      label: 'Octahedron',
      content: <div className="text-[#1c41f1]">8 Faces</div>
    },
    { 
      type: 'dodecahedron' as const,
      label: 'Dodecahedron',
      content: <div className="text-[#1c41f1]">12 Faces</div>
    },
    { 
      type: 'icosahedron' as const,
      label: 'Icosahedron',
      content: <div className="text-[#1c41f1]">20 Faces</div>
    },
    { 
      type: 'sphere' as const,
      label: 'Sphere',
      content: <div className="text-[#1c41f1]">∞ Faces</div>
    }
  ];

  return (
    <>
      {shapes.map((shape, index) => {
        const angle = (index / shapes.length) * Math.PI * 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        return (
          <Shape
            key={`${shape.type}-${index}`}
            type={shape.type}
            position={{ x, y, z: 0 }}
            label={shape.label}
            content={shape.content}
          />
        );
      })}
    </>
  );
};

export default ShapesCircle; 