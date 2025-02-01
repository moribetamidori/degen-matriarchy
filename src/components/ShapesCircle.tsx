"use client";

import React, { useState } from "react";
import Shape from "./Shape";
import WomenArchive from "./WomenArchive";
import MusicPlayer from "./MusicPlayer";
import PostItModal from "@/components/PostItModal";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import SnailSurfaceModal from "./SnailSurfaceModal";

interface ShapesCircleProps {
  radius: number;
  centerX: number;
  centerY: number;
}

const ShapesCircle: React.FC<ShapesCircleProps> = ({
  radius,
  centerX,
  centerY,
}) => {
  const { user } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSnailSurfaceModalOpen, setIsSnailSurfaceModalOpen] = useState(false);

  const shapes = [
    {
      type: "tetrahedron" as const,
      label: user ? "Logged in" : "Login",
      content: (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      ),
      onClick: () => setIsLoginModalOpen(true),
    },
    {
      type: "cube" as const,
      label: "Cube",
      content: <div className="text-[#1c41f1] p-4">6 Faces</div>,
    },
    {
      type: "octahedron" as const,
      label: "Monolith",
      content: (
        <SnailSurfaceModal
          isOpen={isSnailSurfaceModalOpen}
          onClose={() => setIsSnailSurfaceModalOpen(false)}
        />
      ),
      onClick: () => setIsSnailSurfaceModalOpen(true),
    },
    {
      type: "dodecahedron" as const,
      label: "Post-Its",
      content: (
        <PostItModal
          isOpen={true}
          onClose={() => {}}
          userId={user?.id ?? "defaultUserId"}
        />
      ),
    },
    {
      type: "icosahedron" as const,
      label: "Music Vibes",
      content: <MusicPlayer />,
    },
    {
      type: "sphere" as const,
      label: "Archive of ♀",
      content: <WomenArchive />,
    },
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
            onClick={shape.onClick}
          />
        );
      })}
    </>
  );
};

export default ShapesCircle;
