import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Dashboard() {

    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.remove("token");
        setToken('');
        navigate('/login');

    }
    return (
        <div>
            <h1>Welcome to Dashboard</h1>
            <button onClick={handleClick}>Log Out</button>
        </div>
    );

}