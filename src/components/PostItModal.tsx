import React, { useState } from "react";
import PostItNote from "./PostItNote";

interface PostItModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = [
  "#1c41f1", // blue
  "#f14d1c", // orange
  "#1cf14d", // green
  "#f11c41", // red
  "#411cf1", // purple
  "#f1f11c", // yellow
];

interface Note {
  id: string;
  text: string;
  position: { x: number; y: number };
  color: string;
}

const PostItModal: React.FC<PostItModalProps> = ({ isOpen, onClose }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [inputText, setInputText] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const handleClose = () => {
    setNotes([]);
    setInputText("");
    onClose();
  };

  const addNote = () => {
    if (!inputText.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText,
      position: {
        x: Math.random() * (window.innerWidth - 200),
        y: Math.random() * (window.innerHeight - 200),
      },
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setNotes([...notes, newNote]);
    setInputText("");
  };

  const updateNotePosition = (
    id: string,
    newPosition: { x: number; y: number }
  ) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, position: newPosition } : note
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={handleClose}
          className="text-[#1c41f1] hover:text-[#4361ee] z-50"
        >
          ✕
        </button>
      </div>

      <div className="absolute top-4 left-4 flex items-center gap-2">
        {!isInputVisible ? (
          <button
            onClick={() => setIsInputVisible(true)}
            className="px-4 py-2 border border-[#1c41f1] text-[#1c41f1] rounded hover:bg-[#1c41f1] hover:text-black transition-all duration-300"
          >
            +
          </button>
        ) : (
          <div className="flex gap-2 animate-slideIn">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="bg-transparent border border-[#1c41f1] text-[#1c41f1] px-4 py-2 rounded w-64"
              placeholder="Type your note..."
              autoFocus
            />
            <button
              onClick={addNote}
              className="px-4 py-2 border border-[#1c41f1] text-[#1c41f1] rounded hover:bg-[#1c41f1] hover:text-black whitespace-nowrap"
            >
              Add Note
            </button>
            <button
              onClick={() => setIsInputVisible(false)}
              className="px-4 py-2 border border-[#1c41f1] text-[#1c41f1] rounded hover:bg-[#1c41f1] hover:text-black"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {notes.map((note) => (
        <PostItNote
          key={note.id}
          text={note.text}
          position={note.position}
          color={note.color}
          onPositionChange={(newPosition) =>
            updateNotePosition(note.id, newPosition)
          }
        />
      ))}
    </div>
  );
};

export default PostItModal;
