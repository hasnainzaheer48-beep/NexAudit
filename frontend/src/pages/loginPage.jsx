import { useState, useContext } from "react";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext'

export default function Login() {

    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            const result = await api.post('/api/auth/login', { email, password });
            const { token, message } = result.data;
            localStorage.setItem("token", token);
            setToken(token);
            console.log(token);
            console.log(message);
            setEmail('');
            setPassword('');
            const userData = await api.get('/api/auth/me');
            setUser(userData.data);
            console.log(userData.data);
            navigate("/dashboard");
        }
        catch (error) {
            console.error(error);
        }


    }

    const handleEmail = (event) => {

        setEmail(event.target.value);
    }


    const handlePassword = (event) => {

        setPassword(event.target.value);
    }


    return (
        <div className="bg-[#cbcbcb] min-h-screen flex items-center justify-center">
            {/* Login Box */}
            <div className="bg-[#f2f2f2] max-w-7xl flex rounded-2xl p-4 shadow-xl ">
                {/* form */}
                <div className="sm:w-1/2">
                    <h1 className="font-bold text-4xl mb-2">
                        Welcome To NexAudit
                    </h1>
                    <h2 className="font-semibold text-2xl mb-23">
                        Login
                    </h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8">
                        <input className="border bg-white border-gray-500 text-2xl rounded-xl p-2 focus:outline-none focus:border-gray-700 " type="text" placeholder="Email" value={email} onChange={handleEmail} />
                        <input className="border bg-white border-gray-500 text-2xl rounded-xl p-2 focus:outline-none focus:border-gray-700  " type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        <button className=" bg-[#4d1717] text-white text-2xl rounded-xl p-2 ">Sign In</button>
                    </form>
                </div>
                {/* image */}
                <div className="w-1/2 sm:block hidden ">
                    <img className="rounded-2xl " src="/loginPage2.jpg" />
                </div>
            </div>
        </div>
    );
}