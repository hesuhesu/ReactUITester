import React from 'react';
import styled from 'styled-components';
import { flipInHorBottom } from '../components/Animation.tsx';

const AboutContainer = styled.div`
height: 100vh; // 전체 화면 높이
    display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    align-items: center; // 가로 중앙 정렬
    color: #282c34; // 텍스트 색상 설정

    background-image: linear-gradient(to bottom,
            #282c34,
            rgba(214, 230, 245, 0.925),
            #282c34);
`;

const IntroduceContainer = styled.div`
display: flex; // 플렉스 컨테이너로 설정
        flex-direction: column; // 위에서 아래로 수직 배치
        align-items: center; // 수평 중앙 정렬
        justify-content: center; // 수직 중앙 정렬
        background-color: rgba(214, 230, 245, 0.925); // 배경색
        border: 1px solid #ddd; // 테두리
        border-radius: 10px; // 모서리 둥글게
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); // 그림자 효과
        overflow: hidden;
        margin-top: 5vh;
        height: 90%;
        width: 40%;
        animation: ${flipInHorBottom} 0.5s ease forwards;
`;

const Img = styled.img`
max-width: 100%; // 이미지가 부모 요소에 맞게 조정
            height: 30%; // 비율 유지
            border-radius: 10px; // 이미지 모서리 둥글게
`;

const HeaderTwo = styled.h2`
    font-size: 50px;
`;

const DT = styled.dt`
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
`;

const DD = styled.dd`
margin-top: 10px;
            font-size: 15px;
`;

const About: React.FC = () => {
    return (
        <AboutContainer>
            <IntroduceContainer>
                <Img src="profile.jpeg" alt="Description" />
                <HeaderTwo>은희수</HeaderTwo>
                <dl>
                    <DT>생년월일</DT>
                    <DD>1999.10.30</DD>

                    <DT>학력</DT>
                    <DD>금성고등학교 (2015.03 ~ 2018.02)</DD>
                    <DD>동아대학교 컴퓨터 공학과 (2018.03 ~ 2025.02)</DD>

                    <DT>취미</DT>
                    <DD>운동, 피아노</DD>
                </dl>
            </IntroduceContainer>
        </AboutContainer>
    );
}

export default About;