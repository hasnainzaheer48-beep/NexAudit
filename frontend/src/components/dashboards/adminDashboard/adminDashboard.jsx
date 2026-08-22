
import { AuthContext } from '../../../context/AuthContext'
import { useContext } from "react";
import RecentActivity from '../recentActivity';
import AdminStatGrid from "./adminStatGrid";
import LoadingComponent from "../../ui/loadingComponent";

export default function AdminDashboard() {
    const { loading } = useContext(AuthContext);
    if (loading) {
        return <LoadingComponent />
    }
    return (
        <div className=" flex-1 flex flex-col gap-2 p-1 justify-center">
            <div className="flex-1">

                < AdminStatGrid />
            </div>
            <div className='flex-1'>
                <RecentActivity />
            </div>
        </div>
    );
}