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
        <aside className="bg-[#F9FAFB] flex flex-col w-64 h-full shrink-0 rounded-2xl shadow-lg p-2 ">
            <div className="p-6 text-2xl font-bold text-center ">NexAudit</div>
            <nav className="flex-1 flex flex-col">
                {
                    links.map((link) => {
                        return <button className='text-center '>
                            <NavLink key={link.path} to={link.path}>{link.name}</NavLink>
                        </button>
                    })
                }

            </nav>
            <button className="bg-[#4d1717] text-white rounded-2xl p-2 font-semibold hover:cursor-pointer hover:scale-103 hover:duration-300 " onClick={handleClick}>Log Out</button>
        </aside>
    )
}