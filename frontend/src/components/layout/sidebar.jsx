import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import navigation from "../../utils/navigation";

export default function Sidebar() {


    const { setToken, setUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const links = navigation[user.role] || [];





    const handleClick = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate('/login');

    }
    return (
        <aside className="bg-gray-200 flex flex-col w-64 h-full">
            <div className="p-6 text-2xl font-bold">HELOO</div>
            <nav className="flex-1 flex flex-col">
                {
                    links.map((link) => {
                        return <NavLink key={link.path} to={link.path}>{link.name}</NavLink>
                    })
                }

            </nav>
            <button className="bg-white border-2 border-black" onClick={handleClick}>Log Out</button>
        </aside>
    )
}