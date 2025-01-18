import React from 'react';
import styled from 'styled-components';

const Admin: React.FC = () => {
    return (
        <Container>
            <Header>DashBoard</Header>
            <Sidebar>
                <h2>메뉴</h2>
                <ul>
                    <li>게시물 추가</li>
                    <li>사용자 관리</li>
                    <li>설정</li>
                    <li onClick={() => console.log("log out")}>로그아웃</li>
                </ul>
            </Sidebar>
            <MainContent>
                <h2>관리자님 환영합니다!</h2>
                <p>여기에 주요 내용을 추가하세요.</p>
            </MainContent>
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr; // Sidebar + Main Content
  grid-template-rows: auto 1fr; // Header + Content
  height: 100vh;
`;

const Header = styled.header`
  grid-column: 1 / -1;
  background-color: #4a90e2;
  color: white;
  padding: 1rem;
  text-align: center;
`;

const Sidebar = styled.aside`
  background-color: #f4f4f4;
  padding: 1rem;
  border-right: 1px solid #ddd;
`;

const MainContent = styled.main`
  padding: 1rem;
`;

export default Admin;