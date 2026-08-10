import StatCard from "../statCard";
import OverdueAudits from "./overdueAudits";

export default function ManagerDashboard() {
    return (
        <div className="bg-amber-300 flex-1 flex flex-col gap-2 p-1">
            <div id="StatCards" className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
                <StatCard title={'StatCard Title'} stat={12} />
                <StatCard title={'StatCard Title'} stat={12} />
                <StatCard title={'StatCard Title'} stat={12} />
            </div>
            <div id="Overdue Audits">
                <OverdueAudits />
            </div>
            <div>

            </div>
        </div>
    );
}