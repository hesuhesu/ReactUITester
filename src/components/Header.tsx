import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { textFlickerInGlow, fadeInUp, fadeIn } from './Animation.tsx';

const Header: React.FC = () => {
    const location = useLocation();

    // 경로에 따라 h1 텍스트 설정
    const pageTitle = (() => {
        switch (location.pathname) {
            case '/about':
                return 'About';
            case '/project':
                return 'Project';
            case '/diary':
                return 'Diary';
            case '/quilleditor':
                return 'Quill Editor';
            default:
                if (location.pathname.startsWith('/diary_detail')) {
                    return 'Welcome to My Blog'; // diary_detail 경로일 때
                }
                return 'Portfolio';
        }
    })();

    return (
        <HeaderContainer>
            {pageTitle === "Project" ? <ProjectHeader>{pageTitle}</ProjectHeader> : <HeaderOne>{pageTitle}</HeaderOne>}
                <NavList>
                    <li><StyledLink to="/">Home</StyledLink></li>
                    <li><StyledLink to="/about">About</StyledLink></li>
                    <li><StyledLink to="/project">Project</StyledLink></li>
                    <li><StyledLink to="/diary">Diary</StyledLink></li>
                </NavList>
        </HeaderContainer>
    );
};

const HeaderContainer = styled.header`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    background-color: #282c34;
    color: rgba(214, 230, 245, 0.925);
    padding: 10px;
    text-align: center;

    @media (max-width: 768px) {
        padding: 20px;
    }

    @media (max-width: 480px) {
        padding: 15px;
    }
`;

const HeaderOne = styled.h1`
    font-size: 100px;
    animation: ${fadeIn} 0.7s ease forwards;
    opacity: 0;

    @media (max-width: 768px) {
        font-size: 60px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
    }
`;

const ProjectHeader = styled.h1`
    font-size: 100px;
    animation: ${textFlickerInGlow} 2s ease forwards;

    @media (max-width: 768px) {
        font-size: 60px;
    }

    @media (max-width: 480px) {
        font-size: 40px;
    }
`;

const NavList = styled.ul`
    list-style-type: none;
    padding: 0;

    li {
        display: inline-block; // inline-block으로 변경하여 transform 효과 적용
        margin: 0 15px;
        opacity: 0; // 기본적으로 숨김
        transform: translateY(20px);
        animation: ${fadeInUp} 0.5s forwards;

        // 순서에 따른 지연
        &:nth-child(1) {
            animation-delay: 0.1s;
        }
        &:nth-child(2) {
            animation-delay: 0.2s;
        }
        &:nth-child(3) {
            animation-delay: 0.3s;
        }
        &:nth-child(4) {
            animation-delay: 0.4s;
        }
    }

    @media (max-width: 768px) {
        li {
            margin: 0 10px;
        }
    }

    @media (max-width: 480px) {
        li {
            margin: 0 5px;
            font-size: 14px; /* 링크 텍스트 크기 축소 */
        }
    }
`;

const StyledLink = styled(Link)`
    color: rgba(214, 230, 245, 0.925);
    text-decoration: none;
    display: inline-block; // inline-block으로 변경하여 transform 효과 적용
    transition: transform 0.3s ease; // 부드러운 전환 효과 추가

    &:hover {
        transform: translateY(-5px);
    }

    @media (max-width: 480px) {
        font-size: 12px; /* 작은 화면에서 텍스트 크기 축소 */
    }
`;

export default Header;