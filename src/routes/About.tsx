import React from 'react';
import styled from 'styled-components';
import { flipInHorBottom } from '../components/Animation.tsx';

const About: React.FC = () => {
    return (
        <AboutContainer>
            <IntroduceContainer>
                <img src="profile.jpeg" alt="Description" />
                <h2>은희수</h2>
                <DescriptionContainer>
                    <dt>생년월일</dt>
                    <dd>1999.10.30</dd>

                    <dt>학력</dt>
                    <dd>금성고등학교 (2015.03 ~ 2018.02)</dd>
                    <dd>동아대학교 컴퓨터 공학과 (2018.03 ~ 2025.02)</dd>

                    <dt>취미</dt>
                    <dd>운동, 피아노</dd>
                </DescriptionContainer>
            </IntroduceContainer>
        </AboutContainer>
    );
}

const AboutContainer = styled.div`
    height: 100vh; // 전체 화면 높이
    display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    align-items: center; // 가로 중앙 정렬
    color: rgba(214, 230, 245, 0.925); // 텍스트 색상 설정
    background-color: #282c34;
`;

const IntroduceContainer = styled.div`
    display: flex; // 플렉스 컨테이너로 설정
    flex-direction: column; // 위에서 아래로 수직 배치
    align-items: center; // 수평 중앙 정렬
    justify-content: center; // 수직 중앙 정렬
    background-color: ; // 배경색
    border: 5px solid rgba(214, 230, 245, 0.925); // 테두리
    border-radius: 10px; // 모서리 둥글게
    overflow: hidden;
    margin-top: 5vh;
    height: 90%;
    width: 40%;
    animation: ${flipInHorBottom} 0.5s ease forwards;

    img {
        max-width: 100%; // 이미지가 부모 요소에 맞게 조정
        height: 30%; // 비율 유지
        border-radius: 10px; // 이미지 모서리 둥글게
    }

    h2 {
        font-size: 50px;
    }
`;


const DescriptionContainer = styled.dl`
    dt {
        font-size: 25px;
        margin-top: 20px;
        margin-bottom: 20px;
        position: relative;

        &::after {
            content: "";
            display: block;
            width: 100%; /* 전체 폭 사용 */
            height: 3px; /* 언더바 두께 */
            background: linear-gradient(to right, rgba(214, 230, 245, 0.925), #777, #282c34); /* 그라데이션 색상 */
            position: absolute;
            bottom: -1vh; /* dt 아래로 위치 조정 */
            left: 0;
        }
    }

    dd {
        margin-top: 10px;
        font-size: 15px;
    }
`;

export default About;