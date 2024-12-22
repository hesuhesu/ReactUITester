import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useIntersectionObserver from '../../../utils/useIntersectionObserver.tsx';
import { fadeIn } from '../../Animation.tsx';

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

interface data {
  _id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
}

const SideBar: React.FC = () => {
  const { isVisible, elementRef } = useIntersectionObserver({ threshold: 0.2 });
  const [data, setData] = useState<data[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${HOST}:${PORT}/diary/one_page_read`, {
          params: { category: '전체' },
        });
        setData(response.data.list);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <SideBarContainer ref={elementRef} style={{ opacity: isVisible ? 1 : 0 }}>
      <SideBarHeader className={isVisible ? 'fade-in' : ''}>
        <h2>Diary 목록</h2>
        <button onClick={() => navigate('/diary')}>자세히 보기</button>
      </SideBarHeader>
      <DataList className={isVisible ? 'fade-in' : ''}>
        {data.map((item, index) => (
          <DataItem key={index} onClick={() => navigate(`/diary_detail/${item._id}`)}>
            <h3>title : {item.title || `제목 ${index + 1}`}</h3>
            <p>{item.content || `설명 ${index + 1}`}</p>
          </DataItem>
        ))}
      </DataList>
    </SideBarContainer>
  );
};

export default SideBar;

const SideBarContainer = styled.div`
  width: 70vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(214, 230, 245, 0.925);
  border-radius: 10px;
  color: #282c34;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  transition: opacity 0.5s ease-in-out; // fadeIn 을 위한 효과
  
  .fade-in {
    animation: ${fadeIn} 1s ease forwards;
  }

  @media (max-width: 768px) {
    width: 50vw;
  }

  @media (max-width: 480px) {
    width: 70vw;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  opacity: 0;

  h2 {
    font-size: 24px;
  }

  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 12px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const DataList = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: row;
  gap: 15px;
  opacity: 0;
`;

const DataItem = styled.div`
  background-color: white;
  min-width: 20vw;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  
  h3 {
    margin: 0 0 10px;
    font-size: 18px;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #555;
  }
`;