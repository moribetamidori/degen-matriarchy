import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const SnailSurfaceVisualization = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    mountNode.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    camera.position.z = 5;

    // Create snail surface
    const geometry = new THREE.BufferGeometry();
    const points: number[] = [];
    const colors: number[] = []; // Array to store colors

    // Generate points using the formula
    const uSegments = 100;
    const vSegments = 100;

    for (let i = 0; i <= uSegments; i++) {
      for (let j = 0; j <= vSegments; j++) {
        const u = (i / uSegments) * Math.PI * 2;
        const v = ((j / vSegments) * 2 - 1) * Math.PI;
        const a = u;

        const x = a * Math.cos(v) * Math.sin(u);
        const y = a * Math.cos(u) * Math.cos(v);
        const z = -a * Math.sin(v);

        points.push(x, y, z);

        // Create rainbow stripes using v parameter
        const hue = ((v + Math.PI) / (2 * Math.PI)) * 360; // Normalize v to [0, 360]
        const color = new THREE.Color().setHSL(hue / 360, 1, 0.5);
        colors.push(color.r, color.g, color.b);
      }
    }

    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points, 3)
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true, // Enable vertex colors
    });

    const snailSurface = new THREE.Points(geometry, material);
    scene.add(snailSurface);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      snailSurface.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      mountNode.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default SnailSurfaceVisualization;
