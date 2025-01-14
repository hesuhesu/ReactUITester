import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { jelloVertical } from '../components/Animation.tsx';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import KakaoLogin from '../components/KakaoLogin.tsx';

const AUTH: string = process.env.REACT_APP_AUTH as string;
const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;
const NAME = process.env.REACT_APP_ADMIN_NAME;
const PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;

interface LoginItem {
    name: string;
    password: string;
}

const AuthPage: React.FC = () => {
    const [status, setStatus] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginItem>({
        name: '',
        password: '',
    });
    const navigate = useNavigate();
    
    useEffect(() => {
        if (authCheck() === 0){ return; }
        setStatus(!status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지

        if (loginData.name === NAME && loginData.password === PASSWORD){
            successMessage("환영합니다 관리자님!");
            localStorage.setItem("auth", AUTH);
            navigate("/");
            return;
        }

        const response = await fetch(`${HOST}:${PORT}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: loginData.name, password: loginData.password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('jwtToken', token);
            successMessage("환영합니다 회원님!");
        } else {
            console.error('로그인 실패..');
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            successMessage("사용자 모드로 돌아갑니다");
            localStorage.clear();
            setStatus(prevStatus => !prevStatus);
        } catch (e) { errorMessage('에러'); }
    }

    async function login(username, password) {
        const response = await fetch('http://yourserver.com/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
    
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            
            // 토큰을 로컬 스토리지에 저장
            localStorage.setItem('jwtToken', token);
            console.log('로그인 성공:', token);
        } else {
            console.error('로그인 실패');
        }
    }

    function logout() {
        localStorage.removeItem('jwtToken'); // 토큰 삭제
        console.log('로그아웃 성공');
    }

    function checkAuth() {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            console.log('사용자가 인증됨');
            // 인증된 사용자에 대한 UI 업데이트
        } else {
            console.log('사용자가 인증되지 않음');
            // 비인증 사용자에 대한 UI 업데이트
        }
    }

    return (
        <AuthContainer>
            {status ? <AdminBox>
                <button onClick={handleLogout}>로그아웃</button>
                <button onClick={() => navigate("/")}>HomePage</button>
            </AdminBox> :  
            <AuthBox onSubmit={handleLogin}>
                <h2>Auth | User</h2>
                <input
                    placeholder="name"
                    onChange={(e) => setLoginData((prevState) => ({ ...prevState, name: e.target.value }))}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setLoginData((prevState) => ({ ...prevState, password: e.target.value }))}
                    required
                />
                <button type="submit">Auth In</button>
                <button onClick={() => navigate("/")}>HomePage</button>
                <KakaoLogin/>
            </AuthBox>}
        </AuthContainer>
    );
}

const Structure = css`
    width: 25rem; // 400px 
    padding: 2.5rem; // 40px
    background-color: white; 
    border-radius: 0.625rem; // 10px
    box-shadow: 0 0.25rem 1.25rem rgba(0, 0, 0, 0.1); // 0 4px 20px
    text-align: center;

    @media (max-width: 1200px) {
        width: 22.5rem; // 360px
        padding: 2.25rem; // 36px
    }

    @media (max-width: 768px) {
        width: 20rem; // 320px
        padding: 2rem,; // 32px
    }

    @media (max-width: 480px) {
        width: 17.5rem; // 280px
        padding: 1.75rem; // 28px
    }

    @media (max-width: 344px) {
        width: 15rem; // 240px 
        padding: 1.5rem; // 24px
    }
`;

const AuthContainer = styled.div`
    height: 100vh; 
    width: 100%;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(214, 230, 245, 0.925);
    color: #282c34;

    button {
        margin-top: 1rem; 
        margin-bottom: 1rem; 
        padding: 0.5rem 1rem; // 8px 16px
        background-color: #282c34;
        border: none;
        border-radius: 0.625rem; // 10px 
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2); // 0 4px 8px

        &:hover {
            box-shadow: 0 0.375rem 0.75rem rgba(0, 0, 0, 0.25); // 0 6px 12px
            animation: ${jelloVertical} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 0.1875rem 0.375rem rgba(0, 0, 0, 0.2); // 0 3px 6px
            transform: translateY(1px);
        }

        @media (max-width: 768px) {
            font-size: 0.875rem; // 14px
            padding: 0.5rem 1rem; // 8px 16px
        }

        @media (max-width: 480px) {
            font-size: 0.75rem; // 12px
            padding: 0.375rem 0.875rem; // 6px 14px
        }

        @media (max-width: 344px) {
            font-size: 0.625rem; // 10px 
            padding: 0.25rem 0.75rem; // 4px 12px
        }
    }
`;

const AuthBox = styled.form`
    ${Structure}
`;

const AdminBox = styled.div`
    ${Structure}
`;

export default AuthPage;