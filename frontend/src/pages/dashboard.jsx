import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/dashboards/adminDashboard';
import AuditorDashboard from '../components/dashboards/auditorDashboard';
import ManagerDashboard from '../components/dashboards/managerDashBoard';


export default function Dashboard() {


    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (user.role === "ADMIN") {
        return (
            <div>
                <div className='text-4xl font-bold'>Welcome Back <span className='font-bold text-[#174d38]' >{user.first_name}</span> </div>
                <AdminDashboard />
            </div>
        )
    }
    if (user.role === "AUDITOR") {
        return (
            <div>
                <div className='text-4xl font-bold'>Welcome Back <span className='font-bold text-[#174d38]' >{user.first_name}</span> </div>
                <AuditorDashboard />
            </div>
        )


    }
    if (user.role === "MANAGER") {
        return (
            <div>
                <div className='text-4xl font-bold'>Welcome Back <span className='font-bold text-[#174d38]' >{user.first_name}</span> </div>
                <ManagerDashboard />
            </div>
        )

    }

}