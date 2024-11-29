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
    padding: 1rem;
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center; 
    align-items: center; // 가로 중앙 정렬
    color: rgba(214, 230, 245, 0.925);
    background-color: #282c34;

    @media (max-width: 1200px) {
        padding: 0.875rem; /* 14px */
        height: 90vh;
    }

    @media (max-width: 768px) {
        padding: 0.625rem; /* 10px */
        height: 85vh;
    }

    @media (max-width: 480px) {
        padding: 0.375rem; /* 6px */
    }

    @media (max-width: 344px) {
        padding: 0.25rem; /* 4px */
    }
`;

const IntroduceContainer = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;
    justify-content: center;
    background-color: #282c34;
    border: 5px solid rgba(214, 230, 245, 0.925);
    border-radius: 0.625rem;
    overflow: hidden;
    height: 90%;
    width: 40%;
    animation: ${flipInHorBottom} 0.5s ease forwards;

    img {
        max-width: 100%;
        height: 30%;
        border-radius: 0.625rem;
    }

    h2 {
        font-size: 3rem;
    }

    @media (max-width: 1200px) {
        width: 70%;
        height: 80%;

        img {
            height: 30%;
        }
    }

    @media (max-width: 768px) {
        height: 70%;
        h2 {
            font-size: 2.5rem;
        }

        img {
            height: 25%;
        }
    }

    @media (max-width: 480px) {
        width: 90%;
        height: 60%;

        h2 {
            font-size: 2.0rem;
        }

        img {
            height: 20%;
        }
    }

    @media (max-width: 480px) {
        h2 {
            font-size: 1.5rem;
        }
    }
`;


const DescriptionContainer = styled.dl`
    dt {
        margin-top: 20px;
        margin-bottom: 20px;
        position: relative;

        &::after {
            content: "";
            display: block;
            width: 100%;
            height: 0.25rem;
            background: linear-gradient(to right, rgba(214, 230, 245, 0.925), #777, #282c34); /* 그라데이션 색상 */
            position: absolute;
            bottom: -1vh;
            left: 0;
        }
    }

    dd {
        margin-top: 0.625rem;
    }

    @media (max-width: 1200px) {
        dt {
            font-size: 0.875rem; /* 14px */

            &::after {
                height: 0.125rem; /* 2px */
            }
        }

        dd {
            font-size: 0.875rem; /* 14px */
        }
    }

    @media (max-width: 768px) {
        dt {
            font-size: 0.75rem; /* 12px */
        }

        dd {
            font-size: 0.75rem; /* 12px */
        }
    }

    @media (max-width: 480px) {
        dt {
            font-size: 0.625rem; /* 10px */
        }

        dd {
            font-size: 0.625rem; /* 10px */
        }
    }

    @media (max-width: 344px) {
        dt {
            font-size: 0.5rem; /* 8px */
        }

        dd {
            font-size: 0.5rem; /* 8px */
        }
    }
`;

export default About;