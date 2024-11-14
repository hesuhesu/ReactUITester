import React from 'react';
import '../css/Home.scss';

const Home: React.FC = () => {
    
    return (
        <div className="home">
            <h2>Future Possibility</h2>
            <div className="home-1">
                <strong>성장, 노력, 끈기</strong>
                <p>Frontend 개발자 은희수입니다!</p>
            </div>
            
            <div className="home-2">
                <p>제 2 화면입니다.</p>
            </div>
        </div>
    )
}

export default Home