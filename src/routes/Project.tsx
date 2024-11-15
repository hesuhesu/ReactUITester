import React from 'react';
import '../scss/Project.scss';

const Project: React.FC = () => {

  return (
    <div className="project">
      <h2>프로젝트 화면</h2>
      <p>입니다.</p>

      <div className="flip">
        <div className="card">
          <div className="front">프로젝트 이미지</div>
          <div className="back">프로젝트 설명</div>
        </div>
      </div>
    </div>
  )
}

export default Project