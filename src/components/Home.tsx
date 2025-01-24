import React, { useState } from "react";
import Flex from "./Flex.tsx";
import Grid from "./Grid.tsx";

const Home: React.FC = () => {
    const [flex, setFlex] = useState<boolean>(false);
    const [grid, setGrid] = useState<boolean>(false);

    return (
        <div className="flex flex-col items-center m-3 p-6">
            <h1 className="text-3xl font-bold p-6">Hello Tailwind</h1>
            <div className="flex space-x-4">
                <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={() => setFlex(!flex)}>flex 예시 보기</button>
                <button className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700" onClick={() => setGrid(!grid)}>grid 예시 보기</button>
            </div>
            <div className="flex flex-col items-center w-screen">
                {flex && <Flex />}
                {grid && <Grid />}
            </div>
        </div>
    )
}

export default Home;