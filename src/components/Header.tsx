import React from 'react';
import '../css/Header.scss'

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>Portfolio</h1>
            <nav>
                <ul className="nav-list">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">Introduce</a></li>
                    <li><a href="/project">Project</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;