"use client";
import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative bg-black border border-[#1c41f1] p-8 rounded-lg max-w-lg w-full m-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1c41f1] hover:text-[#4361ee]"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal; 