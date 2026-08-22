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
        <div className="flex-1 min-h-0 flex flex-col gap-2 p-1">
            <StatGrid role={(user.role).toLowerCase()} />
            <div className='flex-1 min-h-0'>

                <OverdueAudits role={(user.role).toLowerCase()} />
            </div>
            <div className='flex-1 min-h-0 grid sm:grid-cols-1 md:grid-cols-2 gap-2'>
                <div className='min-h-0'>
                    <UpcomingAudits role={(user.role).toLowerCase()} />

                </div>
                <RecentActivity />
            </div>
        </div>
    );
}