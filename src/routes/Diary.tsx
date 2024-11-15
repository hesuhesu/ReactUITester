import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../scss/Diary.scss';

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;



interface ReviewItem {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
}

const Experience: React.FC = () => {
    const [api, setApi] = useState<ReviewItem[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${HOST}:${PORT}/diary/all_read`)
            .then((response) => {
                setApi(response.data.list);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="experience">
            <h2>My Diary</h2>
            <button onClick={() => navigate("/quilleditor")}>게시물 작성하기</button>
            {api.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>제목</th>
                            <th>내용</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {api.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>{item.title}</td>
                                <td>{item.content}</td>
                                <td>{item.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : <div>DB 데이터 없음</div>}
        </div>
    );
};

export default Experience;