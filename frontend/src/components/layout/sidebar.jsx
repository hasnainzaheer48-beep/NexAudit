import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import navigation from "../../utils/navigation";
import { CircleUser, LogOut, PanelLeftClose } from 'lucide-react';


export default function Sidebar() {


    const { setToken, setUser, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(true)

    const links = navigation[user.role] || [];





    const handleClick = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        navigate('/login');

    }
    return (
        <aside className={` bg-white border border-[#cbcbcb] flex flex-col h-full  rounded-2xl shadow-lg p-2 transition-all duration-300 ${expanded ? "w-64" : "w-20 rounded-4xl"} `}>
            <div className="p-4 pb-2 flex justify-between items-center ">
                <img onClick={() => setExpanded(curr => !curr)} src="/logo.png" alt="Logo" className={`overflow-hidden transition-all ${expanded ? "w-34" : "w-0"}`} />
                <button onClick={() => setExpanded(curr => !curr)} >
                    {expanded ? < PanelLeftClose className="text-gray-500 hover:cursor-pointer hover:bg-gray-100 rounded-md transition " /> : <img src="/logoOnly.png" className="w-7" />}
                </button>
            </div>
            <nav className="flex-1 flex flex-col p-3 gap-2">
                {
                    links.map((link) => {

                        const Icon = link.icon;


                        return <NavLink key={link.path} to={link.path} className={({ isActive }) => `
                            group relative flex items-center gap-3
                            py-2 px-3 mb-2 font-medium rounded-md
                            transition-colors duration-200
                                 ${isActive ? ' bg-[#174d38] text-white'
                                : 'text-gray-600 hover:bg-[#174d38] hover:text-white'
                            }
                            `}>
                            <div className="flex justify-center items-center">
                                <Icon className={`w-5 h-5 shrink-0 items-center ${expanded ? "" : " group-hover:scale-120 grorup-hover:p-3 duration-150"}`} />
                            </div>
                            <span className={`overflow-hidden whitespace-nowrap transition-all ${expanded ? "w-30" : "w-0"}`}>
                                {link.name}
                            </span>
                            {
                                (!expanded) && <div className={`absolute z-20 left-full rounded-md px-2 py-1 ml-6
                                bg-[#174d48] text-white text-sm
                                -translate-x-3 invisible opacity-0 transition-all
                                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                                `}>
                                    {link.name}
                                </div>
                            }
                        </NavLink>

                    })
                }

            </nav>
            <div className={`text-[#174d38]  flex py-2 px-2 items-center rounded-xl border border-[#cbcbcb]`}>
                <CircleUser className={`w-9 h-9 rounded-full text-[#174d38] bg-white ml-1`} />
                <div className={`  flex justify-between items-center overflow-hidden transition-all ${expanded ? "flex-1 ml-3" : 'w-0'}`}>
                    <div className="leading-4 min-w-0">
                        <h4 className="font-medium text-lg truncate">{user.first_name + ' ' + user.last_name}</h4>
                        <span className="text-sm block truncate">{user.email}</span>
                    </div>
                    <button className="bg-[#174d38] shrink-0 text-white rounded-2xl p-2 font-semibold hover:cursor-pointer hover:scale-103 duration-300 " onClick={handleClick}>
                        <LogOut />
                    </button>
                </div>
            </div>
        </aside >
    )
}