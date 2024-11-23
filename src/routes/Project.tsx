import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { slideDown } from '../components/Animation.tsx';

const Project: React.FC = () => {
  return (
    <ProjectContainer>
      <ProjectDiv>
        <PictureDiv>프로젝트 1</PictureDiv>
        <ContentDiv>
          <h2>완성도 높은 WYSIWYG Editor 구축</h2>
          <p>Javascript-Based 문서 편집 기능과 ThreeJS 를 활용한 GLTF Editor 를 결합한 졸업 과제 프로젝트입니다.</p>
          <button><Link to="https://github.com/hesuhesu/SW_Project" target='_blank'>Github</Link></button>
        </ContentDiv>
      </ProjectDiv>
      <ProjectDiv>
        <ContentDiv>
          <h2>3D WYSIWYG Editor</h2>
          <p>졸업 과제의 3D Editor 기능을 보강하여 코드 리팩토링 및 클라이언트 배포를 진행한 토이 프로젝트 입니다.</p>
          <button><Link to="https://gltfeditor.o-r.kr" target='_blank'>Site Link</Link></button>
        </ContentDiv>
        <PictureDiv>
          <img src="3D_Editor.png"></img>
          <img src="3D_Editor2.png"></img>
        </PictureDiv>
      </ProjectDiv>
      <ProjectDiv>
        <PictureDiv>
          <img src="MyBlog.png"></img>
          <img src="MyBlog2.png"></img>
        </PictureDiv>
        <ContentDiv>
          <h2>나만의 블로그 만들기</h2>
          <p>포트폴리오 겸 직접 블로그를 제작하였습니다.</p>
          <button><Link to="https://github.com/hesuhesu/ReactUITester" target='_blank'>Github</Link></button>
        </ContentDiv>
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

const ProjectDiv = styled.div`
  display: flex;
  height: 100vh; 
  width: 70%;
  border: none;
  border-radius: 20px; 
  background-color: rgba(214, 230, 245, 0.925);
  z-index: 1;
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    width: 50%;
    background-color: rgba(214, 230, 245, 0.925);

    h2 {
      font-size: 30px;
    }
`;

const PictureDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center;
    width: 50%;
    background-color: #7F8995;

    img {
      height: 50%;
      width:100%;
    }
`;

export default Project