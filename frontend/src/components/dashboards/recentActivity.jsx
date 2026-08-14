import useRecentActivity from "../../hooks/useRecentActivity"
import PageTitle from "../ui/pageTitle";
import RecentActivityCard from './recentActivityCard'

export default function RecentActivity() {

    const { recentActivity, loading, error } = useRecentActivity();
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className=" w-full h-full p-1">
            <PageTitle title={'Recent Activity'} />
            <div className="flex-1 flex-col gap-1 justify-center items-center">
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