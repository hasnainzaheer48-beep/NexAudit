export default function RecentActivityCard({ activity }) {
    return (
        <div key={activity.id} className="bg-white border border-[#cbcbcb] shadow-lg px-1 py-3 text-center rounded-lg ">
            {activity.changed_by} {(activity.action).toLowerCase()} {activity.entity_type} At {new Date(activity.created_at).toLocaleString()}
        </div>
    )
}