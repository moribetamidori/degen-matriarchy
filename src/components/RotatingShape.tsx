import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RotatingShapeProps {
  position: { x: number; y: number; z: number };
  shapeType: 'tetrahedron' | 'cube' | 'octahedron' | 'dodecahedron' | 'icosahedron' | 'sphere';
}

const RotatingShape: React.FC<RotatingShapeProps> = ({ position, shapeType }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(100, 100);
    mount.appendChild(renderer.domElement);

    // Create wireframe geometry based on shapeType
    let geometry;
    switch (shapeType) {
      case 'tetrahedron':
        geometry = new THREE.TetrahedronGeometry(1);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(1, 1, 1);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1);
        break;
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(1);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(1, 8, 6);
        break;
    }

    const material = new THREE.LineBasicMaterial({ 
      color: 0x1c41f1,
      transparent: true,
      opacity: 0.8
    });
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(geometry),
      material
    );
    scene.add(wireframe);

    camera.position.z = 2.5;

    // Add hover effect
    mount.addEventListener('mouseenter', () => {
      (material as THREE.LineBasicMaterial).opacity = 1;
    });

    mount.addEventListener('mouseleave', () => {
      (material as THREE.LineBasicMaterial).opacity = 0.8;
    });

    const animate = () => {
      requestAnimationFrame(animate);
      wireframe.rotation.x += 0.01;
      wireframe.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, [shapeType]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        left: `${position.x - 50}px`,
        top: `${position.y - 50}px`,
        width: '100px',
        height: '100px',
        zIndex: 1,
      }}
    />
  );
};

export default RotatingShape; 