import { useNavigate } from 'react-router-dom'


export default function Dashboard() {


    const navigate = useNavigate();


    return (
        <div>
            <h1 className='text-2xl text-center'>Welcome to Dashboard</h1>

        </div>
    );

}