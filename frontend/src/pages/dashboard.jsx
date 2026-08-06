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
        return <AdminDashboard />
    }
    if (user.role === "AUDITOR") {
        return <AuditorDashboard />
    }
    if (user.role === "MANAGER") {
        return <ManagerDashboard />
    }

}