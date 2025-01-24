import React from "react";

const color:string = "text-gray-600";

const Header: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-3 flex justify-center">
            <img className="w-10 px-1" src="vite.svg"/>
            <a className={`text-gray-300 p-3 hover:${color}`}>Home</a>
            <a className={`text-gray-300 p-3 hover:${color}`}>About</a>
            <a className={`text-gray-300 p-3 hover:${color}`}>MyPage</a>
        </nav>
    )
}

export default Header;