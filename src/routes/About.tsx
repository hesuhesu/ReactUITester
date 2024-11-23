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

                    <dt>병역</dt>
                    <dd>육군 만기 전역 (2019.08 ~ 2021.03)</dd>

                    <dt>취미</dt>
                    <dd>운동, 피아노</dd>
                </DescriptionContainer>
            </IntroduceContainer>
        </AboutContainer>
    );
}

const AboutContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column; // 세로 방향으로 정렬
    align-items: center; // 가로 중앙 정렬
    color: rgba(214, 230, 245, 0.925);
    background-color: #282c34;
`;

const IntroduceContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    background-color: #282c34;
    border: 5px solid rgba(214, 230, 245, 0.925);
    border-radius: 10px;
    overflow: hidden;
    margin-top: 5vh;
    height: 90%;
    width: 40%;
    animation: ${flipInHorBottom} 0.5s ease forwards;

    img {
        max-width: 100%;
        height: 30%;
        border-radius: 10px;
    }

    h2 {
        font-size: 40px;
    }
`;


const DescriptionContainer = styled.dl`
    dt {
        font-size: 15px;
        margin-top: 20px;
        margin-bottom: 20px;
        position: relative;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 3px;
            background: linear-gradient(to right, rgba(214, 230, 245, 0.925), #777, #282c34); /* 그라데이션 색상 */
            position: absolute;
            bottom: -1vh;
            left: 0;
        }
    }

    dd {
        margin-top: 10px;
        font-size: 15px;
    }
`;

export default About;