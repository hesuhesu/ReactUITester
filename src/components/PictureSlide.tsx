import React, { useState } from 'react';
import styled from 'styled-components';

interface PictureDivProps {
    pictures: string[];
}

const PictureSlide: React.FC<PictureDivProps> = ({ pictures }) => {
    const [slideIndex, setSlideIndex] = useState<number>(0); // 0부터 시작하는 인덱스

    const handleNext = () => {
        setSlideIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    };

    const handlePrev = () => {
        setSlideIndex((prevIndex) => (prevIndex - 1 + pictures.length) % pictures.length);
    };

    return (
        <SlideDiv>
            <img src={pictures[slideIndex]} alt={`Slide ${slideIndex}`} />
            {pictures.length > 1 && <>
                <LeftButton onClick={handlePrev}>&lt;</LeftButton>
                <RightButton onClick={handleNext}>&gt;</RightButton>
            </>}
        </SlideDiv>
    );
}

const SlideDiv = styled.div`
    position: relative;
    width:50%;
    height: 100%;
    background-color: #282c34;
    border-radius: 10px;
    img {
        border-radius: 10px;
        object-fit: scale-down;
        height: 100%;
        width: 100%;
    }

    @media (max-width: 768px) {
        border-radius: 8px;
        width: 100%;
        height: 50%;
        img {
            width: 100%;
            border-radius: 8px;
        }
    }

    @media (max-width: 480px) {
        border-radius: 5px;
        width: 100%;
        height: 50%;
        img {
            width: 100%;
            border-radius: 5px;
        }
    }
`;

const LeftButton = styled.button`
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translateY(-50%);
    background: #282c34;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    font-size: 30px;
    color: rgba(214, 230, 245, 0.925);

    @media (max-width: 768px) {
        left: 10px; /* 버튼 위치를 더 안쪽으로 이동 */
        padding: 8px; /* 버튼 크기 축소 */
        font-size: 25px; /* 폰트 크기 축소 */
    }

    @media (max-width: 480px) {
        left: 5px; /* 작은 화면에서 버튼 위치 조정 */
        padding: 6px; /* 버튼 크기 더 축소 */
        font-size: 20px; /* 폰트 크기 축소 */
    }
`;

const RightButton = styled.button`
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    background: #282c34;
    border: none;
    border-radius: 50%;
    padding: 10px;
    cursor: pointer;
    font-size: 30px;
    color: rgba(255, 255, 255, 1);

    @media (max-width: 768px) {
        right: 10px; /* 버튼 위치를 더 안쪽으로 이동 */
        padding: 8px; /* 버튼 크기 축소 */
        font-size: 25px; /* 폰트 크기 축소 */
    }

    @media (max-width: 480px) {
        right: 5px; /* 작은 화면에서 버튼 위치 조정 */
        padding: 6px; /* 버튼 크기 더 축소 */
        font-size: 20px; /* 폰트 크기 축소 */
    }
`;

export default PictureSlide;