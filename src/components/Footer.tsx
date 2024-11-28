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
    padding: 10px;
    text-align: center;

    a {
        color: rgba(214, 230, 245, 0.925);
        margin: 0 15px;
        display: inline-block;

        &:hover {
            color: #61dafb;
        }
    }

    @media (max-width: 768px) {
        a {
            margin: 0 10px;
            font-size: 0.9rem; /* 링크 크기 줄이기 */
        }
    }

    @media (max-width: 480px) {
        a {
            margin: 0 5px;
            font-size: 0.8rem; /* 작은 화면에서 텍스트 크기 축소 */
        }
    }

    @media (max-width: 360px) {
        a {
            margin: 0 4px;
            font-size: 0.7rem; /* 작은 화면에서 텍스트 크기 축소 */
        }
    }
`;

const Copyright = styled.p`
    margin-top: 10px;
    font-size: 0.9rem;

    @media (max-width: 768px) {
        font-size: 0.8rem; /* 태블릿 크기에서 폰트 크기 축소 */
    }

    @media (max-width: 480px) {
        font-size: 0.7rem; /* 작은 화면에서 폰트 크기 축소 */
    }

    @media (max-width: 360px) {
        font-size: 0.6rem; /* 작은 화면에서 폰트 크기 축소 */
    }
`;

export default Footer;