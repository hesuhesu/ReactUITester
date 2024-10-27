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
                    
                    <dt>취미
                        <dd>운동, 피아노</dd>
                    </dt>

                    <dt>이메일
                        <dd>hesuhesu@naver.com</dd>
                    </dt>
                </dl>
            </div>
        </div>
    );
}

export default About;