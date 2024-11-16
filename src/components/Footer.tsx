import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faReact } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const EMAIL = process.env.REACT_APP_EMAIL; // .env 로 본인 이메일 설정

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
            color: #61dafb; // 아이콘에 마우스를 올렸을 때 색상 변경
        }
    }
`;

const Copyright = styled.p`
    margin-top: 10px;
    font-size: 0.9rem;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <a href="https://github.com/hesuhesu" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href={`mailto:${EMAIL}`}>
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
            <a href="https://ko.legacy.reactjs.org/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faReact} size="2x" />
            </a>
            <Copyright>© 2024. hesuhesu. All rights reserved</Copyright>
        </FooterContainer>
    );
};

export default Footer;