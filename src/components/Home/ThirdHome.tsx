import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fadeIn } from '../Animation.tsx';

const ThirdHome: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <ThirdHomeContainer ref={containerRef}>
      <p className={isVisible ? 'fade-in' : ''} style={{ animationDelay: `0.5s` }}>자기소개서는?</p>
      <button className={isVisible ? 'fade-in' : ''} style={{ animationDelay: `0.6s` }}>Click</button>
      <p className={isVisible ? 'fade-in' : ''} style={{ animationDelay: `0.7s` }}>Project 로..</p>
      <button className={isVisible ? 'fade-in' : ''} onClick={() => navigate('/project')} style={{ animationDelay: `0.8s` }}>Click</button>
      <p className={isVisible ? 'fade-in' : ''} style={{ animationDelay: `0.9s` }}>Diary 로..</p>
      <button className={isVisible ? 'fade-in' : ''} onClick={() => navigate('/diary')} style={{ animationDelay: `1.0s` }}>Click</button>
    </ThirdHomeContainer>
  );
};

export default ThirdHome;

const ThirdHomeContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;

  p {
    font-size: 30px;
    opacity: 0; /* 초기 상태 */
    transform: translateY(20px); /* 초기 위치 */
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  button {
    font-size: 20px;
    opacity: 0; /* 초기 상태 */
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  button:hover {
    transform: scale(1.2);
    opacity: 1;
    box-shadow: 0 0 15px 5px rgba(214, 230, 245, 0.925); /* 빛나는 효과 */
  }

  .fade-in {
    animation: ${fadeIn} 1s ease forwards;
  }

  @media (max-width: 768px) {
    p {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 18px;
    }
  }
`;