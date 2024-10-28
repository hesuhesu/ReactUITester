import React from 'react';
import { useLocation } from 'react-router-dom';
import '../css/Header.scss'

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
        <header className="header">
            {pageTitle === "Project" ? <h1 className="project-page">{pageTitle}</h1> : <h1>{pageTitle}</h1>}
            <nav>
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/project">Project</a></li>
                    <li><a href="/experience">Experience</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;