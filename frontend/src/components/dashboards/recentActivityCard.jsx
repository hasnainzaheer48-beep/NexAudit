import { Archive, CircleCheckBig, CircleMinus, CirclePlus, SquarePen, UserPen, UserRoundMinus } from "lucide-react"

export default function RecentActivityCard({ activity }) {

    const actionIcons = {
        "Created": CirclePlus,
        "Updated": SquarePen,
        "Deleted": CircleMinus,
        "Assigned Auditor": UserPen,
        "Status Updated": SquarePen,
        "Completed": CircleCheckBig,
        "Archived": Archive,
        "Deactivated": UserRoundMinus
    }

    let Icon = actionIcons[activity.action]

    return (
        <div className="bg-white border border-[#cbcbcb] shadow-sm px-3 py-2  flex gap-3 items-center">
            <div className=" bg-green-100 text-[#174d38] size-10 p-2 flex justify-center items-center rounded-full">
                <Icon className="size-7 shrink-0" />
            </div>
            <div key={activity.id} className="leading-5.5 tracking-wider  ">
                <div className="font-bold text-base ">{activity.entity_type} {(activity.action).toLowerCase()}</div>
                {
                    activity.entity_name &&
                    <div className="font-medium text-sm text-gray-700 ">{activity.entity_name} • {activity.client_name}</div>
                }
                <div className="font-medium text-sm text-gray-500">
                    {activity.changed_by} • {new Date(activity.created_at).toLocaleString()}
                </div>
            </div>
        </div>
    )
}