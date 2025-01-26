"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Image from "next/image";

const phrases = ["Money", "Power", "Violence"]; // Add your phrases here

const Landing: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    stars: THREE.Points;
  } | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true // Added for smoother rendering
    });
    
    // Initial setup
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update renderer
      renderer.setSize(width, height, false); // Added false for better performance
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI displays
      
      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer DOM element size
      const canvas = renderer.domElement;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    };
    
    updateSize();
    mount.appendChild(renderer.domElement);

    // Starfield setup
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff,
      size: 0.7, // Adjusted star size
      sizeAttenuation: true // Stars get smaller with distance
    });
    
    const starVertices = [];
    for (let i = 0; i < 15000; i++) { // Increased star count
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    // Store references
    sceneRef.current = { scene, camera, renderer, stars };

    // Debounced resize handler to prevent too many updates
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (sceneRef.current) {
          updateSize();
          // Force one render after resize
          renderer.render(scene, camera);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
      mount.removeChild(renderer.domElement);
      // Dispose of Three.js resources
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
      sceneRef.current = null;
    };
  }, []);

  return (
    <div>
      <div 
        ref={mountRef} 
        style={{ 
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -1,
          overflow: "hidden"
        }} 
      />
      <div className="moving-band top-band">
        <div className="scroll">
          {[...Array(10)].map((_, i) => (
            phrases.map((phrase, index) => (
              <span key={`top-${i}-${index}`} className="phrase">
                {phrase}
              </span>
            ))
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <Image src="/dm.png" alt="Centered Image" width={180} height={180} />
      </div>
      <div className="moving-band bottom-band">
        <div className="scroll reverse">
          {[...Array(10)].map((_, i) => (
            phrases.map((phrase, index) => (
              <span key={`bottom-${i}-${index}`} className="phrase">
                {phrase}
              </span>
            ))
          ))}
        </div>
      </div>
      <style jsx>{`
        .moving-band {
          overflow: hidden;
          white-space: nowrap;
          background-color: transparent;
          color: #1C41F1;
          padding: 10px 0;
          position: fixed;
          width: 100%;
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
      `}</style>
    </div>
  );
};

export default Landing;
