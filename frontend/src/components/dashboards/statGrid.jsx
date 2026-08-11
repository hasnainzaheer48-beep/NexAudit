import useStats from "../../hooks/useStats"
import StatCard from "./statCard"



export default function StatGrid({ role }) {

    const { stats, loading, error } = useStats(role);

    let statCards = [];

    if (role === 'manager') {
        statCards = [
            {
                title: 'Total Audits',
                stat: stats.total_audits
            },
            {
                title: 'Audits In Progress',
                stat: stats.progress_audits
            },
            {
                title: 'Completed Audits',
                stat: stats.finished_audits
            }
        ]
    }
    if (role === 'auditor') {
        statCards = [
            {
                title: 'Total Tasks',
                stat: stats.total_tasks
            },
            {
                title: 'Tasks In Progress',
                stat: stats.progress_tasks
            },
            {
                title: 'Completed Tasks',
                stat: stats.finished_tasks
            }
        ]
    }

    if (loading) return <>Loading</>
    if (error) return <>{error}</>
    return (
        <div id="StatCards" className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {
                statCards.map((statCard) => {
                    return <StatCard title={statCard.title} stat={statCard.stat} />
                })
            }


        </div>
    )
}