import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { textFlickerInGlow, fadeInUp } from './Animation.tsx';


const FooterContainer = styled.header`
    background-color: #282c34;
    color: rgba(214, 230, 245, 0.925);
    padding: 10px;
    text-align: center;
`;

const HeaderOne = styled.h1`
    font-size: 100px;
    animation: fadeIn 0.7s ease forwards;
    opacity: 0;
`;

const ProjectHeader = styled.h1`
    font-size: 100px;
    animation: ${textFlickerInGlow} 2s ease forwards;
`;

const NavList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const List = styled.li`
    display: inline-block; // inline-block으로 변경하여 transform 효과 적용
    margin: 0 15px;
    opacity: 0; // 기본적으로 숨김
    transform: translateY(20px); // 아래에서 올라오는 효과
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
`;

const Link = styled.a`
    color: rgba(214, 230, 245, 0.925);
    text-decoration: none;
    display: inline-block; // inline-block으로 변경하여 transform 효과 적용
    transition: transform 0.3s ease; // 부드러운 전환 효과 추가

    &:hover {
        transform: translateY(-5px); // 마우스를 올렸을 때 위로 올라가는 효과
    }
`;

const Header: React.FC = () => {
    const location = useLocation();

    // 경로에 따라 h1 텍스트 설정
    const pageTitle = (() => {
        switch (location.pathname) {
            case '/about':
                return 'About';
            case '/project':
                return 'Project';
            case '/experience':
                return 'Experience';
            default:
                return 'Portfolio';
        }
    })();

    return (
        <FooterContainer>
            {pageTitle === "Project" ? <ProjectHeader>{pageTitle}</ProjectHeader> : <HeaderOne>{pageTitle}</HeaderOne>}
                <NavList>
                    <List><Link href="/">Home</Link></List>
                    <List><Link href="/about">About</Link></List>
                    <List><Link href="/project">Project</Link></List>
                    <List><Link href="/diary">Diary</Link></List>
                </NavList>
        </FooterContainer>
    );
};

export default Header;