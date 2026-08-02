import { useState } from "react";
import login from '../api/axios';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    const handleSubmit = async (event) => {

        try {
            event.preventDefault();
            await login.post('/api/auth/login', { email, password });
            console.log(event);
            setEmail('');
            setPassword('');
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
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Email" value={email} onChange={handleEmail} />
                <input type="password" placeholder="Enter Password" value={password} onChange={handlePassword} />
                <button>Sign In</button>
            </form>
        </>
    );
}