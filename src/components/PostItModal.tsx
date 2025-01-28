import React, { useState, useRef, useEffect } from "react";
import PostItNote from "./PostItNote";
import { Database } from "../../supabase/database.types";
import * as postItService from "@/services/postItService";

type Page = Database["public"]["Tables"]["pages"]["Row"];
type Note = Database["public"]["Tables"]["post_it_notes"]["Row"];

interface PostItModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const COLORS = [
  "#1c41f1", // blue
  "#f14d1c", // orange
  "#1cf14d", // green
  "#f11c41", // red
  "#411cf1", // purple
  "#f1f11c", // yellow
];

const PostItModal: React.FC<PostItModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [pages, setPages] = useState<Page[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [inputText, setInputText] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const pagesData = await postItService.getPages();

        if (pagesData.length === 0) {
          // Create initial page if none exists
          const newPage = await postItService.createPage(1);
          setPages([newPage]);
          setNotes([]);
        } else {
          setPages(pagesData);
          const notesData = await postItService.getNotesByPage(pagesData[0].id);
          setNotes(notesData);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  // Load notes when changing pages
  useEffect(() => {
    const loadPageNotes = async () => {
      if (!pages[currentPageIndex]) return;

      try {
        const notesData = await postItService.getNotesByPage(
          pages[currentPageIndex].id
        );
        setNotes(notesData);
      } catch (error) {
        console.error("Error loading notes:", error);
      }
    };

    loadPageNotes();
  }, [currentPageIndex, pages]);

  const handleClose = () => {
    setPages([]);
    setNotes([]);
    setCurrentPageIndex(0);
    setInputText("");
    onClose();
  };

  const addNote = async () => {
    if (!inputText.trim()) return;

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const maxWidth = containerRect.width - 250;
    const maxHeight = containerRect.height - 250;

    try {
      const newNote = await postItService.createNote({
        text: inputText,
        position_x: Math.random() * maxWidth + 100,
        position_y: Math.random() * maxHeight + 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        page_id: pages[currentPageIndex].id,
        user_id: userId,
      });

      setNotes((prevNotes) => [...prevNotes, newNote]);
      setInputText("");
      setIsInputVisible(false);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const updateNotePosition = async (
    id: string,
    newPosition: { x: number; y: number }
  ) => {
    try {
      await postItService.updateNotePosition(id, newPosition.x, newPosition.y);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id
            ? { ...note, position_x: newPosition.x, position_y: newPosition.y }
            : note
        )
      );
    } catch (error) {
      console.error("Error updating note position:", error);
    }
  };

  const addNewPage = async () => {
    try {
      const newPage = await postItService.createPage(pages.length + 1);
      setPages((prev) => [...prev, newPage]);
      setCurrentPageIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  // Filter notes for current page
  const currentPageNotes = notes.filter(
    (note) => note.page_id === pages[currentPageIndex]?.id
  );

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
                  ? "bg-[#1c41f1] text-white"
                  : "bg-gray-200"
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

        {currentPageNotes.map((note) => (
          <PostItNote
            key={note.id}
            text={note.text}
            position={{ x: note.position_x, y: note.position_y }}
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
