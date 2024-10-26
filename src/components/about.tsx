import React from 'react';
import '../css/About.scss';

const About: React.FC = () => {
    return (
        <div className="about">
            <div className="introduce">
                <img src="증명사진.jpeg" alt="Description" />
                <h2>은희수</h2>
                <dl>
                    <dt>학 력
                        <dd>금성고등학교 (2015.03 ~ 2018.02)</dd>
                        <dd>동아대학교 컴퓨터공학과 (2018.03 ~ 2025.02)</dd>
                    </dt>
                    
                    <dt>자 격 증
                        <dd>정보처리기사 (2024.06 취득)</dd>
                    </dt>
                    
                    <dt>기술 스택
                        <dd></dd>
                    </dt>
                </dl>
            </div>
        </div>
    );
}

export default About;