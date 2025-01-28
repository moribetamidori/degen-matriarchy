import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

interface UserMenuProps {
  userEmail: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ userEmail }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-[#1c41f1] hover:text-[#4361ee]"
      >
        <span className="mr-2">{userEmail}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-black border border-[#1c41f1] rounded-lg shadow-lg py-1">
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-[#1c41f1] hover:bg-[#1c41f1] hover:text-white"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 