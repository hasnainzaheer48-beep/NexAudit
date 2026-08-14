import useRecentActivity from "../../hooks/useRecentActivity"
import PageTitle from "../ui/pageTitle";
import RecentActivityCard from './recentActivityCard'

export default function RecentActivity() {

    const { recentActivity, loading, error } = useRecentActivity();
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className=" w-full min-h-0 overflow-hidden h-full border border-[#cbcbcb] rounded-2xl ">
            <PageTitle title={'Recent Activity'} variant="Dashboard" />
            <div className="flex-1 min-h-0 flex flex-col overflow-auto">
                {
                    recentActivity?.map((activity) => {
                        return (
                            <RecentActivityCard activity={activity} />
                        )
                    })
                }
            </div>
        </div>
    )
}