import useAdminStats from "../../../hooks/useAdminStats";

import StatCard from "../statCard"



export default function AdminStatGrid() {

    const { loading,
        error,
        adminUserStats,
        adminClientStats,
        adminAuditStats,
        getStats } = useAdminStats();




    const statCards = [
        {
            title: 'Total Users',
            stat: adminUserStats.total_users
        },
        {
            title: 'Total Clients',
            stat: adminClientStats.total_clients
        },
        {
            title: 'Total Audits',
            stat: adminAuditStats.total_audits
        },
        {
            title: 'Active Managers',
            stat: adminUserStats.active_managers
        },
        {
            title: 'Active Auditors',
            stat: adminUserStats.active_auditors
        }
    ]


    if (loading) return <>Loading</>
    if (error) return <>{error}</>
    return (
        <div
            id="StatCards"
            className="flex-1 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
            {statCards.slice(0, 3).map((statCard) => (
                <StatCard
                    key={statCard.title}
                    title={statCard.title}
                    stat={statCard.stat}
                />
            ))}

            <div className="lg:col-span-3 flex justify-center gap-2">
                {statCards.slice(3).map((statCard) => (
                    <StatCard
                        key={statCard.title}
                        title={statCard.title}
                        stat={statCard.stat}
                    />
                ))}
            </div>
        </div>
    )
}