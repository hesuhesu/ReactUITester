import React from 'react';
import styled from 'styled-components';
import { slideDown } from '../components/Animation.tsx';

const Project: React.FC = () => {
  return (
    <ProjectContainer>
      <ProjectIntro>
      <h2>프로젝트 화면</h2>
      <p>입니다.</p>
      </ProjectIntro>
      <ProjectDiv>
        <LeftDiv>프로젝트 1</LeftDiv>
        <RightDiv></RightDiv>
      </ProjectDiv>
      <ProjectDiv>
        <LeftDiv>프로젝트 2</LeftDiv>
        <RightDiv></RightDiv>
      </ProjectDiv>
      <ProjectDiv>
        <LeftDiv>프로젝트 3</LeftDiv>
        <RightDiv></RightDiv>
      </ProjectDiv>
    </ProjectContainer>
  )
}

const ProjectContainer = styled.div`
    height: 450vh; 
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: #282c34;
    color: #282c34;
    position: relative; // 비트맵 애니메이션용 포지션 설정
    overflow: hidden;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #282c34;
        background-image: linear-gradient(
            to bottom,
            #282c34 50%, 
            rgba(214, 230, 245, 0.925) 50%
        );
        background-size: 100% 200%;
        animation: ${slideDown} 2s ease forwards;
        z-index: 0; // 텍스트 뒤에 위치
    }    
`

const ProjectIntro = styled.div`
    height: 80vh; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;

    h2 {
        font-size: 50px;
        color: rgba(214, 230, 245, 0.925); 
        z-index: 1; // 텍스트는 비트맵 위에 유지
    }

    p {
        font-size: 20px;
        color: rgba(214, 230, 245, 0.925); 
        z-index: 1;
    }

    z-index: 1;
`

const ProjectDiv = styled.div`
  display: flex;
  height: 80vh; 
  width: 70%;
  border: none;
  border-radius: 20px; 
  background-color: rgba(214, 230, 245, 0.925);
  z-index: 1;
`;

const LeftDiv = styled.div`
  width: 50%;
  background-color: rgba(214, 230, 245, 0.925);
`;

const RightDiv = styled.div`
  width: 50%;
  background-color: #7F8995;
`;

export default Project