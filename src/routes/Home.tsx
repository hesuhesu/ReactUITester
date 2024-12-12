import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import FirstHome from '../components/Home/FirstHome.tsx';
import SecondHome from '../components/Home/SecondHome.tsx';
import ThirdHome from '../components/Home/ThirdHome.tsx';
import * as THREE from 'three';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    if (canvasRef.current) {
      canvasRef.current.appendChild(renderer.domElement);
    }

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      sizeAttenuation: false, // 거리 감쇠 효과 비활성화
      depthTest: false,       // Z 버퍼 연산 생략
      transparent: true,
    });

    const starVertices: number[] = [];
    for (let i = 0; i < 300; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    let lastRenderTime = 0;
    const fps = 60; // fps 제한

    const animate = (time: number) => {
      requestAnimationFrame(animate);

      const deltaTime = time - lastRenderTime;
      if (deltaTime < 1000 / fps) return;

      lastRenderTime = time;

      stars.rotation.x += 0.001;
      stars.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    animate(0);

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // 클린업 함수에서 모든 객체를 dispose 처리
    return () => {
      window.removeEventListener('resize', handleResize);

      // Dispose of the Three.js objects to free up memory
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        } else if (object instanceof THREE.Points) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });

      // Dispose of the renderer and other resources
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <HomeContainer>
      <ThreeCanvas ref={canvasRef} />
      <FirstHome/>
      <SecondHome/>
      <ThirdHome/>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: rgba(214, 230, 245, 0.925);
  height: 300vh;
  background-color: #282c34;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.6),
    0 0 60px rgba(255, 255, 255, 0.45),
    0 0 110px rgba(255, 255, 255, 0.25),
    0 0 100px rgba(255, 255, 255, 0.1);
  position: relative;
`;

const ThreeCanvas = styled.div`
  position: fixed;
  pointer-events: none;
  top: 0;
  left: 0;
`;

export default Home;
