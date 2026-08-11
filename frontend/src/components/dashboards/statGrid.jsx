import useStats from "../../hooks/useStats"
import StatCard from "./statCard"



export default function StatGrid({ role }) {

    const { stats, loading, error } = useStats(role);

    if (loading) return <>Loading</>
    if (error) return <>{error}</>
    return (
        <div id="StatCards" className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            <StatCard title={'Total Audits'} stat={stats.total_audits} />
            <StatCard title={'Audits In Progess'} stat={stats.progress_audits} />
            <StatCard title={'Completed Audits'} stat={stats.finished_audits} />
        </div>
    )
}