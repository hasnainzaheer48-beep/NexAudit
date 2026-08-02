import { useState, useContext } from "react";
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext'

export default function Login() {

    const navigate = useNavigate();
    const { setToken } = useContext(AuthContext)
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
        <>
            <form onSubmit={handleSubmit} className="inline-flex flex-col gap-3 ">
                <input type="text" placeholder="Enter Email" value={email} onChange={handleEmail} />
                <input type="password" placeholder="Enter Password" value={password} onChange={handlePassword} />
                <button>Sign In</button>
            </form>
        </>
    );
}