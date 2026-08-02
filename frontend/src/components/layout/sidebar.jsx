import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Sidebar() {


    const { setToken } = useContext(AuthContext);


    const handleClick = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate('/login');

    }
    return (
        <aside className="bg-gray-200 flex flex-col w-64 h-full">
            <div className="p-6 text-2xl font-bold">HELOO</div>
            <nav className="flex-1 flex flex-col">
                <NavLink to='/dashboard'>Dashboard</NavLink>

            </nav>
            <button className="bg-white border-2 border-black" onClick={handleClick}>Log Out</button>
        </aside>
    )
}