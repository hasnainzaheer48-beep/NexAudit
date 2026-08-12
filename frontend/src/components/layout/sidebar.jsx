import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import navigation from "../../utils/navigation";
import { CircleUser, LogOut, PanelLeftClose } from 'lucide-react';


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
            <div className="p-4 pb-2 flex justify-between items-center ">
                <img src="/logo.png" alt="Logo" className="w-34" />
                <button>
                    < PanelLeftClose className="text-gray-500 " />
                </button>
            </div>
            <nav className="flex-1 flex flex-col p-3 gap-2">
                {
                    links.map((link) => {

                        const Icon = link.icon;


                        return <NavLink key={link.path} to={link.path} className={({ isActive }) => `
                            group relative flex items-center gap-3
                            py-2 px-3 font-medium rounded-md
                            transition-colors duration-200
                                 ${isActive ? 'bg-linear-to-tr from-[#174d38] to-[#174d38] text-white'
                                : 'text-gray-600 hover:bg-[#174d38] hover:text-white'
                            }
                            `}>
                            <Icon className='w-7 h-7' />
                            <span>
                                {link.name}
                            </span>
                        </NavLink>

                    })
                }

            </nav>
            <div className="bg-[#cbcbcb]  flex p-4 items-center rounded-lg">
                <CircleUser className="w-10 h-10" />
                <div className=" w-full flex justify-between items-center ml-2">
                    <div className="leading-4">
                        <h4 className="font-semibold">{user.first_name + ' ' + user.last_name}</h4>
                        <span className="text-sm">{user.email}</span>
                    </div>
                    <button className="bg-black text-white rounded-2xl p-2 font-semibold hover:cursor-pointer hover:scale-103 duration-300 " onClick={handleClick}>
                        <LogOut />
                    </button>
                </div>
            </div>
        </aside>
    )
}