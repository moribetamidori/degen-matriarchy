import React, { useState, useEffect, useCallback } from 'react';

interface PostItNoteProps {
  text: string;
  position: { x: number; y: number };
  color: string;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  containerRef: React.RefObject<HTMLDivElement>;
}

const PostItNote: React.FC<PostItNoteProps> = ({
  text,
  position,
  color,
  onPositionChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      };
      onPositionChange(newPosition);
    }
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      className="absolute cursor-move"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'rotate(2deg)',
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="w-48 h-48 relative"
        style={{
          background: `linear-gradient(45deg, ${color}22, ${color}44)`,
          border: `2px solid ${color}`,
        }}
      >
        <div className="p-4 font-mono text-sm text-white">{text}</div>
        <div
          className="absolute -bottom-4 -right-4 w-8 h-8"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${color}44 50%)`,
          }}
        />
      </div>
    </div>
  );
};

export default PostItNote; 