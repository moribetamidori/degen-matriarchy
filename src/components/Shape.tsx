"use client";

import React, { useState } from "react";
import RotatingShape from "./RotatingShape";
import Modal from "@/components/Modal";
import PostItModal from "@/components/PostItModal"
import LoginModal from "@/components/LoginModal";
import SnailSurfaceModal from "./SnailSurfaceModal";

interface ShapeProps {
  type:
    | "tetrahedron"
    | "cube"
    | "octahedron"
    | "dodecahedron"
    | "icosahedron"
    | "sphere";
  position: { x: number; y: number; z: number };
  label: string;
  content: React.ReactElement<{ isOpen: boolean; onClose: () => void }>;
  onClick?: () => void;
}

const Shape: React.FC<ShapeProps> = ({ type, position, label, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const renderContent = () => {
    if (React.isValidElement(content)) {
      if (content.type === PostItModal || content.type === LoginModal || content.type === SnailSurfaceModal) {
        return React.cloneElement(content, {
          isOpen: isModalOpen,
          onClose: () => setIsModalOpen(false),
        });
      }
    }

    return (
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {content}
      </Modal>
    );
  };

  return (
    <div className="shape-container">
      <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
        <RotatingShape position={position} shapeType={type} />
        <div
          style={{
            position: "fixed",
            left: `${position.x - 50}px`,
            top: `${position.y + 30}px`,
            width: "100px",
            textAlign: "center",
            color: "#1c41f1",
          }}
        >
          {label}
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Shape;
