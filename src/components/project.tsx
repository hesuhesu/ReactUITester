import React from 'react';
import '../css/Project.scss';

const Project: React.FC = () => {

    return (
        <div className="project">
            <h2>프로젝트 화면</h2>
            <p>입니다.</p>

            <div className="card">
    <div className="card-front">프로젝트 이미지</div>
    <div className="card-back">프로젝트 설명</div>
  </div>
        </div>
    )
}

export default Project