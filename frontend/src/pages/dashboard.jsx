import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/dashboards/adminDashboard/adminDashboard';
import AuditorDashboard from '../components/dashboards/auditorDashboard/auditorDashboard';
import ManagerDashboard from '../components/dashboards/managerDashboard/managerDashboard';


export default function Dashboard() {


    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (user.role === "ADMIN") {
        return (
            <div className='flex flex-col gap-2 h-full '>
                <div >
                    <div className='text-4xl font-bold'>

                        Welcome Back, <span className='font-bold text-[#174d38]' >{user.first_name}</span>
                    </div>
                    <span className='text-lg text-gray-700'>Here's what's happening</span>
                </div>
                <AdminDashboard />
            </div>
        )
    }
    if (user.role === "AUDITOR") {
        return (
            <div className='flex flex-col gap-2 h-full '>
                <div>
                    <div className='text-4xl font-bold'>
                        Welcome Back, <span className='font-bold text-[#174d38]' >{user.first_name}</span>
                    </div>

                    <span className='text-lg text-gray-700'>Here's what's happening</span>

                </div>
                <AuditorDashboard />
            </div>
        )


    }
    if (user.role === "MANAGER") {
        return (
            <div className='flex flex-col gap-2 h-full '>
                <div>
                    <div className='text-4xl font-bold'>

                        Welcome Back, <span className='font-bold text-[#174d38]' >{user.first_name}</span>
                    </div>

                    <span className='text-lg text-gray-700'>Here's what's happening</span>

                </div>
                <ManagerDashboard />
            </div>
        )

    }

}