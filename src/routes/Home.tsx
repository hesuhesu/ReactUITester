import React from 'react';
import styled from 'styled-components';
import { focusInContract } from '../components/Animation.tsx';

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

const Structure = `
width: 100%; // 전체 너비
    display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center; // 세로 중앙 정렬
    align-items: center; // 가로 중앙 정렬
`;

const HomeContainer = styled.div`
    height: 500vh; // 전체 화면 높이
    ${Structure}
    background-image: linear-gradient(
            to bottom,
            #282c34, 
            #7F8995,
            #282c34
        );
    color: rgba(214, 230, 245, 0.925);

    h2 {
        font-size:50px;
        animation: ${focusInContract} 1s ease forwards;
    }
`;

const FirstHome = styled.div`
    ${Structure}
    height: 100vh; // 전체 화면 높이
    p{
        font-size:20px;
    }
`;

const SecondHome = styled.div`
    ${Structure}
    height: 100vh; // 전체 화면 높이
    p{
        color: #282c34;
        font-size:20px;
    }
`;

const ThirdHome = styled.div`
    ${Structure}
    height: 100vh; // 전체 화면 높이
    p{
        color: #282c34;
        font-size:20px;
    }
`;

export default Home