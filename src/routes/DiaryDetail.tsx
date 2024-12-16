import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { vibrate1, fadeIn } from '../components/Animation.tsx';
import { authCheck } from '../utils/authCheck.tsx';
import { errorMessage, successMessage } from '../utils/SweetAlertEvent.tsx';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Quill snow스타일 시트 불러오기
import '../scss/QuillEditor.scss';
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Spinner from '../components/Spinner.tsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleUp, faArrowAltCircleDown } from '@fortawesome/free-regular-svg-icons'; // FontAwesome 아이콘 임포트

hljs.configure({
  languages: ["javascript", "python", "java", "cpp"],
});

const HOST = process.env.REACT_APP_HOST;
const PORT = process.env.REACT_APP_PORT;

interface Data {
    title: string;
    content: string;
    realContent: string;
    category: string;
    imgData: string[];
    createdAt: string;
}

const DiaryDetail: React.FC = () => {
    const params = useParams()._id
    const [admin, setAdmin]= useState<Number>(0);
    const navigate = useNavigate();
    const [data, setData] = useState<Data>({
        title: '',
        content: '',
        realContent: '',
        category: '',
        imgData: [],
        createdAt: ''
    });
    const [isLoading, setIsLoading] = useState<Boolean>(true); // 로딩 상태 관리

    useEffect(() => {
        axios.get(`${HOST}:${PORT}/diary/read`, {
            params: { _id: params }
        }).then((response) => {
            setData(response.data.list);
            if (authCheck() === 0){
                return;
            }
            setAdmin(1);
        }).catch((error) => { console.error(error); })
        .finally(() => {
            // setTimeout(() => setIsLoading(false), 500);
            setIsLoading(false);
          });
    }, [params]);

    const modules = useMemo(() => ({
        syntax: {
            highlight: (text: string) => hljs.highlightAuto(text).value,
        },
        toolbar: false,
    }), []);

    if (isLoading) {
        return <Spinner/>; // 데이터 로딩 중 GIF 표시
    }
    
    const scrollToTop = () => {
        const scrollTarget = 0;
        const currentScroll = window.scrollY;
        const distance = scrollTarget - currentScroll;
        const duration = 1000; // 1초 동안 움직이기
        let startTime: number;
    
        const animateScroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0에서 1까지의 진행 상태
    
            window.scrollTo(0, currentScroll + distance * progress); // 스크롤 이동
    
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll); // 애니메이션이 끝날 때까지 반복
            }
        };
        requestAnimationFrame(animateScroll); // 애니메이션 시작
    };
    
    const scrollToBottom = () => {
        const scrollTarget = document.body.scrollHeight;
        const currentScroll = window.scrollY;
        const distance = scrollTarget - currentScroll;
        const duration = 1000; // 1초 동안 움직이기
        let startTime: number;
    
        const animateScroll = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1); // 0에서 1까지의 진행 상태
    
            window.scrollTo(0, currentScroll + distance * progress); // 스크롤 이동
    
            if (elapsed < duration) {
                requestAnimationFrame(animateScroll); // 애니메이션이 끝날 때까지 반복
            }
        };
        requestAnimationFrame(animateScroll); // 애니메이션 시작
    };

    const handleDelete = () => {
        if (data.imgData.length > 0) {
            axios.delete(`${HOST}:${PORT}/delete_files`, {
              params: {
                imgData: data.imgData
              }
            }).then((response) => { }).catch((error) => { errorMessage("삭제 실패"); })
          }
          axios.delete(`${HOST}:${PORT}/diary/delete`, {
            params: { _id: params }
          }).then((response) => {
            successMessage("게시물이 삭제되었습니다!");
            navigate('/diary');
          }).catch((error) => { errorMessage("삭제 실패"); })
    }

    return (
            <DiaryDetailContainer>
              <HeaderOne>[{data.category}] {data.title}</HeaderOne>
              <HeaderTwo>작성 일시 : {data.createdAt}</HeaderTwo>
              <ButtonContainer>
                <button onClick={() => navigate("/diary")}>돌아가기</button>
                {admin === 1 && (
                  <>
                    <button onClick={() => navigate(`/quilleditor_update/${params}`, { state: data })}>수정하기</button>
                    <button onClick={handleDelete}>삭제하기</button>
                  </>
                )}
              </ButtonContainer>
              <QuillContainer>
                <ReactQuill
                  theme="snow"
                  value={data.realContent}
                  readOnly={true}
                  modules={modules}
                />
              </QuillContainer>

              <ScrollButtonsContainer>
                <button onClick={scrollToTop}>
                    <FontAwesomeIcon icon={faArrowAltCircleUp} size="2x" />
                </button>
                <button onClick={scrollToBottom}>
                    <FontAwesomeIcon icon={faArrowAltCircleDown} size="2x" />
                </button>
            </ScrollButtonsContainer>
            </DiaryDetailContainer>
      );
    };

const DiaryDetailContainer = styled.div`
    overflow: hidden; /* 스크롤바 숨기기 */
    background-color: rgba(214, 230, 245, 0.925);
    animation: ${fadeIn} 0.5s ease-in-out;

    
`;

const ScrollButtonsContainer = styled.div`
    position: fixed;
    bottom: 100px;
    right: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    
    button {
        margin: 5px 0;
        padding: 10px;
        font-size: 20px;
        background-color: #282c34;
        border: none;
        border-radius: 50%;
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;  // 원 모양 버튼
        height: 40px; // 원 모양 버튼

        &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }
    }
`;

const HeaderOne = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5vw;
    color: white;
    background-color: #282c34;
    padding: 20px 40px;
    border-radius: 25px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    border: 2px solid rgba(214, 230, 245, 0.925); 
    
    &:hover {
        background-color: #3a3f47;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3); 
        transform: translateY(-2px); 
    }
`;

const HeaderTwo = styled.h2`
    display:flex;
    justify-content: right;
    font-size: 20px;
    color: #282c34;
`;

const ButtonContainer = styled.div`
    display:flex;
    justify-content: right;

    button {
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: #282c34;
        border: none;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

        &:hover {
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25);
            animation: ${vibrate1} 0.3s ease infinite;
        }

        &:active {
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transform: translateY(1px);
        }
    }
`;

const QuillContainer = styled.div`
    border: 0.625rem ridge #282c34; // 10px
    border-radius: 0.625rem 0.625rem 0 0; // 10px 10px 0 0
    -webkit-user-select:all;
    -moz-user-select:all;
    -ms-user-select:all;
    user-select:all;
`;

export default DiaryDetail;