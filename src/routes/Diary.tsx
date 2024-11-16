import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { authCheck } from '../utils/authCheck';
import { focusInContract, jelloHorizontal } from '../components/Animation.tsx';

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

const DiaryContainer = styled.div`
    height: 100vh; // 전체 화면 높이
    width: 100%; // 전체 너비
    display: flex; // Flexbox 사용
    flex-direction: column; // 세로 방향으로 정렬
    // justify-content: center; // 세로 중앙 정렬
    align-items: center; // 가로 중앙 정렬
    background-color: rgba(214, 230, 245, 0.925);
    color: #282c34;

    h2 {
        font-size: 50px;
        animation: ${focusInContract} 1s ease forwards;
    }

    button {
        margin-top: 20px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #282c34; // 부드러운 그린 컬러
        border: none;
        border-radius: 20px; // 둥근 모서리
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 가벼운 그림자

        &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25); // 그림자 강조
            animation: ${jelloHorizontal} 1s ease forwards;
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px); // 눌렀을 때 약간 내려가는 효과
        }
    }
`;

const TableContainer = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    overflow: hidden;

    thead {
        background-color: #282c34;
        color: rgba(214, 230, 245, 0.925);

        th {
            padding: 15px;
            text-align: left;
            font-weight: 600;
        }
    }

    tbody {
        tr {
            &:nth-child(even) {
                background-color: #f9f9f9;
            }

            &:hover {
                background-color: #f1f1f1;
            }
        }

        td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
    }

    th,
    td {
        text-align: center;
    }
`;

const NoDataMessage = styled.div`
    text-align: center;
    margin-top: 20px;
    color: #666;
    font-size: 1.1rem;
`;

interface ReviewItem {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

const Experience: React.FC = () => {
    const [api, setApi] = useState<ReviewItem[]>([]);
    const [status, setStatus] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${HOST}:${PORT}/diary/all_read`)
            .then((response) => {
                setApi(response.data.list);
            })
            .catch((error) => {
                console.error(error);
            });
        if (authCheck() === 0){ return; }
        setStatus(prevStatus => !prevStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <DiaryContainer>
            <h2>My Diary</h2>
            {status && <button onClick={() => navigate("/quilleditor")}>게시물 작성하기</button>}
            {api.length > 0 ? (
                <TableContainer>
                    <thead>
                        <tr>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {api.map((item) => (
                            <tr key={item._id}>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </TableContainer>
            ) : <NoDataMessage>DB 데이터 없음</NoDataMessage>}
        </DiaryContainer>
    );
};

export default Experience;