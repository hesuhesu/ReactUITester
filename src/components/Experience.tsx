import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Experience.scss';
import Minesweeper from './Minesweeper.tsx';

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
    const [mineSweeper, setMineSweeper] = useState<boolean>(false);
    const [data, setData] = useState<boolean>(false);

    useEffect(() => {
        axios.get(`${HOST}:${PORT}/review/read`)
            .then((response) => {
                setApi(response.data.list);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="experience">
            <h2>체험 영역</h2>
            <button onClick={() => setMineSweeper(!mineSweeper)}>지뢰찾기</button>
            <button onClick={() => setData(!data)}>데이터 보기</button>
            {mineSweeper && <Minesweeper />}
            {data && <>
              {api.length > 0 && (
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
            )}
            </>}
        </div>
    );
};

export default Experience;