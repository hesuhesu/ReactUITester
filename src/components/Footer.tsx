import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import '../css/Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <p>© 2024 나의 사이트. 모든 권리 보유.</p>
            <a href="https://github.com/hesuhesu" target="_blank" rel="noopener noreferrer" className="github-link">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
        </footer>
    );
};

export default Footer;