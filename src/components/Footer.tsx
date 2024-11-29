import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const EMAIL = process.env.REACT_APP_EMAIL; // .env 로 본인 이메일 설정

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <a href="https://github.com/hesuhesu" target="_blank" rel="noopener noreferrer" aria-label="github">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="email">
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            <a href="https://ko.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer" aria-label="react_site">
                <FontAwesomeIcon icon={faReact} size="2x" />
            </a>
            <Copyright>© 2024. hesuhesu. All rights reserved</Copyright>
        </FooterContainer>
    );
};

const FooterContainer = styled.footer`
    background-color: #282c34;
    color: rgba(214, 230, 245, 0.925);
    padding: 0.625rem; /* 10px */
    text-align: center;

    a {
        color: rgba(214, 230, 245, 0.925);
        margin: 0 0.9375rem; /* 15px */
        display: inline-block;

        &:hover {
            color: #61dafb;
        }
    }

    @media (max-width: 1200px) {
        a {
            margin: 0 0.875rem; /* 14px */
        }
    }

    @media (max-width: 768px) {
        a {
            margin: 0 0.625rem; /* 10px */
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        a {
            margin: 0 0.3125rem; /* 5px */
            font-size: 0.8rem; 
        }
    }

    @media (max-width: 344px) {
        a {
            margin: 0 0.25rem; /* 4px */
            font-size: 0.7rem;
        }
    }
`;

const Copyright = styled.p`
    margin-top: 0.625rem; /* 10px */

    @media (max-width: 1200px) {
        font-size: 0.9rem; 
    }

    @media (max-width: 768px) {
        font-size: 0.8rem; 
    }

    @media (max-width: 480px) {
        font-size: 0.7rem; 
    }

    @media (max-width: 344px) {
        font-size: 0.6rem; 
    }
`;

export default Footer;