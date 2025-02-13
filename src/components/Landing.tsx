"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import ShapesCircle from './ShapesCircle';

const phrases = ["Money", "Power", "Violence"]; // For bottom band
const topPhrases = [
  {
    text: "$DM",
    link: "https://pump.fun/coin/D2PmN64ocy9HfkPLKvxaLaqk2gJkuBWPX5uyAEKfpump",
  },
  {
    text: "$DM",
    link: "https://pump.fun/coin/D2PmN64ocy9HfkPLKvxaLaqk2gJkuBWPX5uyAEKfpump",
  },
  {
    text: "$DM",
    link: "https://pump.fun/coin/D2PmN64ocy9HfkPLKvxaLaqk2gJkuBWPX5uyAEKfpump",
  },
  {
    text: "$DM",
    link: "https://pump.fun/coin/D2PmN64ocy9HfkPLKvxaLaqk2gJkuBWPX5uyAEKfpump",
  },
]; // Add your phrases and links here

const Landing: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set initial dimensions
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    // Handle resize events
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDimensions({ width, height });

      if (rendererRef.current && cameraRef.current) {
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;
    mount.appendChild(renderer.domElement);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 2,
      sizeAttenuation: true
    });
    const starVertices = [];
    for (let i = 0; i < 15000; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <div>
      <div
        ref={mountRef}
        style={{ position: "absolute", top: 0, left: 0, zIndex: -1 }}
      />
      <div className="moving-band top-band">
        <div className="scroll" style={{ zIndex: 10, position: 'relative' }}>
          {[...Array(10)].map((_, i) =>
            topPhrases.map((phrase, index) => (
              <a
                href={phrase.link}
                key={`top-${i}-${index}`}
                className="phrase-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {phrase.text}
              </a>
            ))
          )}
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-transparent relative">
        <ShapesCircle 
          radius={Math.min(dimensions.width, dimensions.height) * 0.40}
          centerX={dimensions.width / 2} 
          centerY={dimensions.height / 2} 
        />
        <Image 
          src="/dm.png" 
          alt="Centered Image" 
          width={dimensions.width < 640 ? 60 : 180} 
          height={dimensions.width < 640 ? 60 : 180} 
          className="w-auto h-auto"
        />
      </div>
      <div className="moving-band bottom-band">
        <div className="scroll reverse">
          {[...Array(10)].map((_, i) =>
            phrases.map((phrase, index) => (
              <span key={`bottom-${i}-${index}`} className="phrase">
                {phrase}
              </span>
            ))
          )}
        </div>
      </div>
      <style jsx>{`
        .moving-band {
          overflow: hidden;
          white-space: nowrap;
          background-color: transparent;
          color: #1c41f1;
          padding: 10px 0;
          position: fixed;
          width: 100%;
          z-index: 20;
        }

        .top-band {
          top: 0;
        }

        .bottom-band {
          bottom: 0;
        }

        .scroll {
          display: inline-block;
          animation: scroll 20s linear infinite;
        }

        .scroll.reverse {
          animation: scroll-reverse 20s linear infinite;
        }

        .phrase {
          display: inline-block;
          padding: 0 20px;
          font-size: 1.2rem;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .phrase-link {
          display: inline-block;
          padding: 0 20px;
          font-size: 1.2rem;
          color: #1c41f1;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .phrase-link:hover {
          color: #4361ee;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Landing;
