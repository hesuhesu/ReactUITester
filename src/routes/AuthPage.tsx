import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { jelloVertical } from '../components/Animation.tsx';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent';
import { authCheck } from '../utils/authCheck';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;
const AUTH: string = process.env.REACT_APP_AUTH as string;
const USERNAME = process.env.REACT_APP_USER_NAME;
const USERPASSWORD = process.env.REACT_APP_USER_PASSWORD;

const Structure = `
    width: 400px; // 고정 너비
    padding: 40px; // 내부 여백
    background-color: white; // 배경색
    border-radius: 10px; // 둥근 모서리
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); // 부드러운 그림자
    text-align: center; // 텍스트 중앙 정렬
`;

const AuthContainer = styled.div`
    height: 100vh; // 전체 화면 높이
    width: 100%; // 전체 너비
    display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    justify-content: center; // 세로 중앙 정렬
    align-items: center; // 가로 중앙 정렬
    background-color: rgba(214, 230, 245, 0.925);
    color: #282c34;

    button {
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #282c34;
        border: none;
        border-radius: 20px; // 둥근 모서리
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

        &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
            animation: ${jelloVertical} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px); // 눌렀을 때 약간 내려가는 효과
        }
    }
`;

const AuthBox = styled.form`
    ${Structure}
`;

const AdminBox = styled.div`
    ${Structure}
`;

interface LoginItem {
    username: string;
    password: string;
}

const AuthPage: React.FC = () => {
    const [status, setStatus] = useState<boolean>(false);
    const [loginData, setLoginData] = useState<LoginItem>({
        username: '',
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
        if (loginData.username === USERNAME && loginData.password === USERPASSWORD){
            try {
                await axios.post(`${HOST}:${PORT}/login`, loginData);  
                successMessage("환영합니다 관리자님!");
                localStorage.setItem("auth", AUTH);
                navigate("/");
            } catch (e) { errorMessage('에러'); }
        }
        else {
            errorMessage('유저가 아님!!');
        }
    };

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${HOST}:${PORT}/logout`);
            successMessage("사용자 모드로 돌아갑니다");
            localStorage.clear();
            setStatus(prevStatus => !prevStatus);
        } catch (e) { errorMessage('에러'); }
    }

    return (
        <AuthContainer>
            {status ? <AdminBox>
                <button onClick={handleLogout}>관리자 로그아웃</button>
                <button onClick={() => navigate("/")}>HomePage</button>
            </AdminBox> :  
            <AuthBox onSubmit={handleLogin}>
                <h2>Auth User</h2>
                <input
                    placeholder="username"
                    onChange={(e) => setLoginData((prevState) => ({ ...prevState, username: e.target.value }))}
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
            </AuthBox>}
        </AuthContainer>
    );
}

export default AuthPage;