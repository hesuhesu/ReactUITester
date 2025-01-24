import React from "react";

const Grid_1: React.FC = () => {
    return (
        <div className="flex flex-col p-4 m-4">
            <h1 className="text-3xl font-bold p-4 m-4 text-center">Grid - 1</h1>
            <span className="decoration-clone bg-gradient-to-b from-yellow-400 text-center to-red-500  p-4">
                Hello
                World
            </span>
            <div className="grid grid-cols-3 gap-4 m-4">
                <div className="bg-red-400 box-border">01</div>
                <div className="bg-orange-400">02</div>
                <div className="bg-yellow-400">03</div>
                <div className="col-span-2 bg-green-400">04</div>
                <div className="bg-blue-400">05</div>
                <div className="bg-purple-400">06</div>
                <div className="col-span-2 bg-pink-400">07</div>
            </div>
        </div>
    )
}

export default Grid_1;