import React, { useState, useEffect, useCallback } from 'react';
import * as postItService from "@/services/postItService";
import { PencilIcon, CheckIcon } from '@heroicons/react/24/outline';
interface PostItNoteProps {
  id: string;
  text: string;
  position: { x: number; y: number };
  color: string;
  onPositionChange: (newPosition: { x: number; y: number }) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  canEdit: boolean;
  onTextUpdate?: (newText: string) => void;
}

const PostItNote: React.FC<PostItNoteProps> = ({
  id,
  text,
  position,
  color,
  onPositionChange,
  canEdit,
  onTextUpdate,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const [showUpdateIcon, setShowUpdateIcon] = useState(false);

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

  const handleEdit = async () => {
    if (isEditing) {
      try {
        await postItService.updateNoteText(id, editedText);
        onTextUpdate?.(editedText);
        setIsEditing(false);
        setShowUpdateIcon(false);
      } catch (error) {
        console.error('Error updating note:', error);
      }
    } else {
      setIsEditing(true);
      setShowUpdateIcon(true);
    }
  };

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
        {canEdit && (
          <button
            className="absolute -top-6 -right-4 m-2 text-white p-1 rounded-full bg-[#1c41f1] bg-opacity-40 border border-[#1c41f1]"
            onClick={handleEdit}
          >
            {showUpdateIcon ? <CheckIcon className="size-6" /> : <PencilIcon className="size-6" />}
          </button>
        )}
        <textarea
          className="p-4 font-mono text-sm text-white w-full h-full bg-transparent"
          value={isEditing ? editedText : text}
          onChange={(e) => setEditedText(e.target.value)}
          readOnly={!isEditing}
        />
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