import { AuthContext } from '../../../context/AuthContext'
import { useContext } from "react";
import StatGrid from "../statGrid";
import OverdueTasks from "./overdueTasks";
import UpcomingTasks from './upcomingTasks';
import RecentActivity from '../recentActivity';

export default function AuditorDashboard() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <>Loading</>
    return (
        <div className="flex-1 min-h-0 flex flex-col gap-2 p-1">
            <StatGrid role={(user.role).toLowerCase()} />
            <div className='flex-1 min-h-0'>

                <OverdueTasks role={(user.role).toLowerCase()} />
            </div>
            <div className='flex-1 min-h-0 grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
                <UpcomingTasks role={(user.role).toLowerCase()} />
                <RecentActivity />
            </div>
        </div>
    );
}