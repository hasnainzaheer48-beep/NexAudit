import { AuthContext } from '../../../context/AuthContext'
import { useContext } from "react";
import StatGrid from "../statGrid";
import OverdueAudits from "./overdueAudits";

export default function ManagerDashboard() {

    const { user, loading } = useContext(AuthContext);

    if (loading) return <>Loading</>

    return (
        <div className="bg-amber-300 flex-1 flex flex-col gap-2 p-1">
            <StatGrid role={(user.role).toLowerCase()} />
            <OverdueAudits role={(user.role).toLowerCase()} />
            <div>

            </div>
        </div>
    );
}