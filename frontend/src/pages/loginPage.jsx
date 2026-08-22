import { useState, useContext } from "react";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext'
import FormField from "../components/ui/form/formField";
import FormInput from "../components/ui/form/formInput";

export default function Login() {

    const navigate = useNavigate();
    const { setToken, setUser } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            const result = await api.post('/api/auth/login', { email, password });
            const { token } = result.data;
            localStorage.setItem("token", token);
            setToken(token);

            setEmail('');
            setPassword('');
            const userData = await api.get('/api/auth/me');
            setUser(userData.data);
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
        <div className="bg-white min-h-screen flex items-center justify-center">
            {/* Login Box */}
            <div className="bg-white border border-[#cbcbcb] max-w-7xl flex rounded-2xl shadow-md ">
                {/* image */}
                <div className="w-1/2 sm:block hidden border-r border-[#cbcbcb] ">
                    <img className="rounded-2xl " src="/loginPagefinal.png" />
                </div>
                {/* form */}
                <div className="sm:w-1/2 p-5 pt-30 space-y-1.5">
                    <div >
                        <div className="font-bold text-4xl ">Welcome Back</div>
                        <div className="text-gray-500 text-sm font-medium">Sign in to continue to your NexAudit account</div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField label={"Email"} size="Medium">
                            <FormInput className="border bg-white border-gray-500 text-2xl rounded-xl p-2 focus:outline-none focus:border-gray-700 " type="text" placeholder="Email" value={email} onChange={handleEmail} />
                        </FormField>
                        <FormField label={"Password"} size="Medium">
                            <FormInput className="border bg-white border-gray-500 text-2xl rounded-xl p-2 focus:outline-none focus:border-gray-700  " type="password" placeholder="Password" value={password} onChange={handlePassword} />
                        </FormField>
                        <button className=" bg-[#174d38] text-white text-xl tracking-wider font-medium rounded-xl p-2 hover:scale-102 duration-300 hover:bg-[#154533] ">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}