import useRecentActivity from "../../hooks/useRecentActivity"
import PageTitle from "../ui/pageTitle";

export default function RecentActivity() {

    const { recentActivity, loading, error } = useRecentActivity();
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className="bg-gray-100 w-full h-full p-1 rounded-lg shadow-lg">
            <PageTitle title={'Recent Activity'} />
            <div className="flex flex-col gap-1 justify-center items-center">
                {
                    recentActivity?.map((activity) => {
                        return (
                            <div key={activity.id} className="bg-gray-100 shadow-lg p-1 rounded-lg">
                                {activity.changed_by} {(activity.action).toLowerCase()} {activity.entity_type} At {new Date(activity.created_at).toLocaleString()}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}