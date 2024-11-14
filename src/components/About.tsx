import React from 'react';
import '../css/About.scss';

const About: React.FC = () => {
    return (
        <div className="about">
            <div className="introduce">
                <img src="profile.jpeg" alt="Description" />
                <h2>은희수</h2>
                <dl>
                    <dt>생년월일
                        <dd>1999.10.30</dd>
                    </dt>
                    
                    <dt>학력
                        <dd>금성고등학교 (2015.03 ~ 2018.02)</dd>
                        <dd>동아대학교 컴퓨터 공학과 (2018.03 ~ 2025.02)</dd>
                    </dt>

                    <dt>취미
                        <dd>운동, 피아노</dd>
                    </dt>
                </dl>
            </div>
        </div>
    );
}

export default About;