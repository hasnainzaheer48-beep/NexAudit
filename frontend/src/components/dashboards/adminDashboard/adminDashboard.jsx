import InfoCard from "../../ui/infoCard";
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from "react";
import StatGrid from "../statGrid";
import RecentActivity from '../recentActivity';

export default function AdminDashboard() {
    const { user, loading } = useContext(AuthContext);
    return (
        <div className="bg-gray-300 flex-1 flex flex-col gap-2 p-1">
            <StatGrid role={(user.role).toLowerCase()} />
            <div className='flex-1'>
                <RecentActivity />
            </div>
        </div>
    );
}