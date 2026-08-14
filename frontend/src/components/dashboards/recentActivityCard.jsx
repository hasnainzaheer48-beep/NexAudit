export default function RecentActivityCard({ activity }) {
    return (
        <div key={activity.id} className="bg-yellow-100 shadow-lg p-1 rounded-lg ">
            {activity.changed_by} {(activity.action).toLowerCase()} {activity.entity_type} At {new Date(activity.created_at).toLocaleString()}
        </div>
    )
}