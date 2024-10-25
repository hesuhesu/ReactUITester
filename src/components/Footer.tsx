import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import '../css/Footer.scss'

const Footer = () => {
    return (
        <footer className="footer">
            <a href="https://github.com/hesuhesu" target="_blank" rel="noopener noreferrer" className="github-link">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href={`mailto:${'hesuhesu@naver.com'}`} className="email-link">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            <p>© 2024. hesuhesu. All rights reserved</p>
        </footer>
    );
};

export default Footer;