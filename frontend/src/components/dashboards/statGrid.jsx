import { ClipboardCheck, ClipboardClock, ClipboardList, LayoutList, ListCheck, ListChecks, ListTodo } from "lucide-react";
import useStats from "../../hooks/useStats"
import StatCard from "./statCard"



export default function StatGrid({ role }) {

    const { stats, loading, error } = useStats(role);

    let statCards = [];

    if (role === 'manager') {
        statCards = [
            {
                title: 'Total Audits',
                stat: stats.total_audits,
                icon: ClipboardList,
                subtitle: "Total Audits"
            },
            {
                title: 'Audits In Progress',
                stat: stats.progress_audits,
                icon: ClipboardClock,
                subtitle: "Currently In Progress"
            },
            {
                title: 'Completed Audits',
                stat: stats.finished_audits,
                icon: ClipboardCheck,
                subtitle: "All Completed Audits"
            }
        ]
    }
    if (role === 'auditor') {
        statCards = [
            {
                title: 'Total Tasks',
                stat: stats.total_tasks,
                icon: LayoutList,
                subtitle: "Total Assigned Tasks"
            },
            {
                title: 'Tasks In Progress',
                stat: stats.progress_tasks,
                icon: ListTodo,
                subtitle: "Currently In Progress"
            },
            {
                title: 'Completed Tasks',
                stat: stats.finished_tasks,
                icon: ListChecks,
                subtitle: "All Completed Tasks"
            }
        ]
    }

    if (loading) return <>Loading</>
    if (error) return <>{error}</>
    return (
        <div id="StatCards" className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {
                statCards.map((statCard) => {
                    return <StatCard title={statCard.title} stat={statCard.stat} Icon={statCard.icon} subtitle={statCard.subtitle} />
                })
            }


        </div>
    )
}