import { AuthContext } from '../../../context/AuthContext'
import { useContext } from "react";
import StatGrid from "../statGrid";
import OverdueAudits from "./overdueAudits";
import UpcomingAudits from './upcomingAudits';
import RecentActivity from '../recentActivity';

export default function ManagerDashboard() {

    const { user, loading } = useContext(AuthContext);

    if (loading) return <>Loading</>

    return (
        <div className="bg-amber-300 flex-1 flex flex-col gap-2 p-1">
            <StatGrid role={(user.role).toLowerCase()} />
            <OverdueAudits role={(user.role).toLowerCase()} />
            <div className='flex-1 grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
                <UpcomingAudits role={(user.role).toLowerCase()} />
                <RecentActivity />
            </div>
        </div>
    );
}