import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import AdminDashboard from '../components/dashboards/adminDashboard/adminDashboard';
import AuditorDashboard from '../components/dashboards/auditorDashboard/auditorDashboard';
import ManagerDashboard from '../components/dashboards/managerDashboard/managerDashboard';
import LoadingScreen from '../components/ui/loadingScreen';
import WelcomeCard from '../components/dashboards/welcomeCard';


export default function Dashboard() {


    const navigate = useNavigate();
    const { user, loading } = useContext(AuthContext);
    if (loading) return <LoadingScreen />;
    if (user.role === "ADMIN") {
        return (
            <div className='flex flex-col gap-2 h-full '>
                <WelcomeCard name={user.first_name} />
                <AdminDashboard />
            </div>
        )
    }
    if (user.role === "AUDITOR") {
        return (
            <div className='flex flex-col gap-2 h-full '>
                <WelcomeCard name={user.first_name} />
                <AuditorDashboard />
            </div>
        )


    }
    if (user.role === "MANAGER") {
        return (
            <div className='flex flex-col gap-2 h-full '>
                <WelcomeCard name={user.first_name} />
                <ManagerDashboard />
            </div>
        )

    }

}