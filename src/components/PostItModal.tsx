import React, { useState, useRef } from "react";
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

interface Page {
  id: string;
  notes: Note[];
}

const PostItModal: React.FC<PostItModalProps> = ({ isOpen, onClose }) => {
  const [pages, setPages] = useState<Page[]>([
    { id: '1', notes: [] }
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setPages([{ id: '1', notes: [] }]);
    setCurrentPageIndex(0);
    setInputText("");
    onClose();
  };

  const addNote = () => {
    if (!inputText.trim()) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    // Calculate visible area (accounting for padding and other elements)
    const maxWidth = containerRect.width - 250;  // 200px for note width + 50px buffer
    const maxHeight = containerRect.height - 250; // 200px for note height + 50px buffer

    const newNote: Note = {
      id: Date.now().toString(),
      text: inputText,
      position: {
        x: Math.random() * maxWidth + 100, // Add offset to avoid left edge
        y: Math.random() * maxHeight + 100, // Add offset to avoid top edge
      },
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    setPages(prevPages => {
      const newPages = [...prevPages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        notes: [...newPages[currentPageIndex].notes, newNote]
      };
      return newPages;
    });
    setInputText("");
    setIsInputVisible(false); // Close input after adding note
  };

  const updateNotePosition = (
    id: string,
    newPosition: { x: number; y: number }
  ) => {
    setPages(prevPages => {
      const newPages = [...prevPages];
      newPages[currentPageIndex] = {
        ...newPages[currentPageIndex],
        notes: newPages[currentPageIndex].notes.map(note =>
          note.id === id ? { ...note, position: newPosition } : note
        )
      };
      return newPages;
    });
  };

  const addNewPage = () => {
    setPages(prev => [...prev, { id: Date.now().toString(), notes: [] }]);
    setCurrentPageIndex(prev => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-50 overflow-auto">
      <div 
        ref={containerRef}
        className="relative min-h-screen min-w-screen w-full h-full p-4"
      >
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

        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white p-2 rounded-lg shadow-lg">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(index)}
              className={`w-8 h-8 rounded-full ${
                currentPageIndex === index 
                  ? 'bg-[#1c41f1] text-white' 
                  : 'bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={addNewPage}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {pages[currentPageIndex].notes.map((note) => (
          <PostItNote
            key={note.id}
            text={note.text}
            position={note.position}
            color={note.color}
            onPositionChange={(newPosition) =>
              updateNotePosition(note.id, newPosition)
            }
            containerRef={containerRef as React.RefObject<HTMLDivElement>}
          />
        ))}
      </div>
    </div>
  );
};

export default PostItModal;
