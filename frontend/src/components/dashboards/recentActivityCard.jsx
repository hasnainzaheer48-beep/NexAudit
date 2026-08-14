export default function RecentActivityCard({ activity }) {
    return (
        <div key={activity.id} className="bg-white border border-[#cbcbcb] shadow-lg px-1 py-3 text-center rounded-lg ">
            <div>{activity.entity_type} {(activity.action).toLowerCase()}</div>
            <div></div>
            <div></div>
            {activity.changed_by}  At {new Date(activity.created_at).toLocaleString()}
        </div>
    )
}