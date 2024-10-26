import React from 'react';
import '../css/Experience.scss';
import Minesweeper from './Minesweeper.tsx';
const Experience: React.FC = () => {

    return (
        <div className="experience">
            <h2>체험 영역</h2>
            <Minesweeper/>
        </div>
    )
}

export default Experience