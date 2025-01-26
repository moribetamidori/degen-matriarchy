"use client";

import React, { useState } from "react";
import RotatingShape from "./RotatingShape";
import Modal from "@/components/Modal";

interface ShapeProps {
  type: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron' | 'sphere';
  position: { x: number; y: number; z: number };
  label: string;
  content: React.ReactNode;
}

const Shape: React.FC<ShapeProps> = ({ type, position, label, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {content}
      </Modal>
    </div>
  );
};

export default Shape;
