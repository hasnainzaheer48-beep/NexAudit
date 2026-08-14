import { BookUser, BriefcaseBusiness, Building2, ClipboardList, UserRoundSearch } from "lucide-react";
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
            stat: adminUserStats.total_users,
            icon: BookUser,
            subtitle: "All Users"
        },
        {
            title: 'Total Clients',
            stat: adminClientStats.total_clients,
            icon: Building2,
            subtitle: "Total Clients Registered"
        },
        {
            title: 'Total Audits',
            stat: adminAuditStats.total_audits,
            icon: ClipboardList,
            subtitle: "Total Audits Made"
        },
        {
            title: 'Active Managers',
            stat: adminUserStats.active_managers,
            icon: BriefcaseBusiness,
            subtitle: "All Current Active Managers"
        },
        {
            title: 'Active Auditors',
            stat: adminUserStats.active_auditors,
            icon: UserRoundSearch,
            subtitle: "All Current Active Auditors"
        }
    ]


    if (loading) return <>Loading</>
    if (error) return <>{error}</>
    return (
        <div
            id="StatCards"
            className=" grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
        >
            {statCards.slice(0, 3).map((statCard) => (
                <StatCard
                    key={statCard.title}
                    title={statCard.title}
                    stat={statCard.stat}
                    Icon={statCard.icon}
                    subtitle={statCard.subtitle}
                />
            ))}

            <div className="lg:col-span-3 flex justify-center gap-2">
                {statCards.slice(3).map((statCard) => (
                    <StatCard
                        key={statCard.title}
                        title={statCard.title}
                        stat={statCard.stat}
                        Icon={statCard.icon}
                        subtitle={statCard.subtitle}
                    />
                ))}
            </div>
        </div>
    )
}