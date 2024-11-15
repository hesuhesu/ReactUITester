import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import '../scss/Footer.scss'

const EMAIL = process.env.REACT_APP_EMAIL; // .env 로 본인 이메일 설정

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <a href="https://github.com/hesuhesu" target="_blank" rel="noopener noreferrer" className="github-link">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href={`mailto:${EMAIL}`} className="email-link">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            <a href="https://ko.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer" className="email-link">
                <FontAwesomeIcon icon={faReact} size="2x" />
            </a>
            <p>© 2024. hesuhesu. All rights reserved</p>
        </footer>
    );
};

export default Footer;