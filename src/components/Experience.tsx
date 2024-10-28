import React, { useState } from 'react';
import '../css/Experience.scss';
import Minesweeper from './Minesweeper.tsx';

const Experience: React.FC = () => {

    const [mineSweeper, setMineSweeper] = useState<Boolean>(false);

    return (
        <div className="experience">
            <h2>체험 영역</h2>
            <button onClick={() => setMineSweeper(!mineSweeper)}>지뢰찾기</button>
            {mineSweeper && <Minesweeper/>}
        </div>
    )
}

export default Experience