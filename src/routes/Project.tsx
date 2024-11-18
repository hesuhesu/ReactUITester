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

      <ProjectDiv>프로젝트 1</ProjectDiv>
      <ProjectDiv>프로젝트 2</ProjectDiv>
      <ProjectDiv>프로젝트 3</ProjectDiv>
    </ProjectContainer>
  )
}

const ProjectContainer = styled.div`
    height: 450vh; // 전체 화면 높이
    width: 100%; // 전체 너비
    display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: space-around;
    align-items: center; // 가로 중앙 정렬
    background-color: #282c34; // 초기 배경색
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
        background-color: #282c34; // 초기 배경색
        background-image: linear-gradient(
            to bottom,
            #282c34 50%, 
            rgba(214, 230, 245, 0.925) 50%
        );
        background-size: 100% 200%; // 세로 스크롤 애니메이션 효과
        animation: ${slideDown} 2s ease forwards; // 아래로 애니메이션
        z-index: 0; // 텍스트 뒤에 위치
    }    
`

const ProjectIntro = styled.div`
height: 80vh; // 전체 화면 높이
display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center; // 세로 중앙 정렬
    align-items: center; // 가로 중앙 정렬

h2 {
        font-size: 50px;
        color: rgba(214, 230, 245, 0.925); // 텍스트 색상 설정
        z-index: 1; // 텍스트는 비트맵 위에 유지
    }

    p {
        font-size: 20px;
        color: rgba(214, 230, 245, 0.925); // 텍스트 색상 설정
        z-index: 1; // 텍스트는 비트맵 위에 유지
    }

    z-index: 1;
`

const ProjectDiv = styled.div`
height: 80vh; // 전체 화면 높이
width: 70%;
background-color: rgba(214, 230, 245, 0.925);
        z-index: 1; // 텍스트는 비트맵 위에 유지
`;

export default Project