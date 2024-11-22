import React from 'react';
import styled from 'styled-components';
import { focusInContract, fadeIn } from '../components/Animation.tsx';

const Home: React.FC = () => {
    return (
        <HomeContainer>
            <FirstHome>
                <h2>Future Possibility</h2>
                <strong>성장, 노력, 끈기</strong>
                <p>Frontend 개발자 은희수입니다!</p>
            </FirstHome>
            <SecondHome>
                <p>제 2 화면입니다.</p>
            </SecondHome>
            <ThirdHome>
                <p>제 3 화면입니다.</p>
            </ThirdHome>
        </HomeContainer>
    )
}


const HomeContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color : #282c34
    height: 300vh; // 전체 화면 높이
    background-color: rgba(214, 230, 245, 0.925);
`;

const FirstHome = styled.div`
    height: 100vh;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        font-size:60px;
        animation: ${focusInContract} 1s ease forwards;
    }
    strong {
        animation: ${fadeIn} 2s ease forwards;
    }
    p {
        font-size:30px;
        animation: ${fadeIn} 3s ease forwards;
    }
`;

const SecondHome = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p{
        font-size:30px;
    }
`;

const ThirdHome = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p{
        font-size:30px;
    }
`;

export default Home