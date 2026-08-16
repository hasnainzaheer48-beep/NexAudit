import { Building, Calendar, CalendarCheck, Circle, FileText, Flag, ListPlus, SquarePen, UserRound } from "lucide-react"
import StatusBadge from "../ui/table/statusBadge";
import PriorityBadge from "../ui/table/priorityBadge";

export default function TaskInfo({ title, info, isStatus = false, isPriority = false }) {
    const icons = {
        "Company": Building,
        "Assigned Auditor": UserRound,
        "Description": FileText,
        "Priority": Flag,
        "Status": Circle,
        "Start Date": Calendar,
        "Due Date": Calendar,
        "Completed At": CalendarCheck,
        "Created At": ListPlus,
        "Updated At": SquarePen
    }
    let Icon = icons[title]
    let content;
    if (isStatus) {
        content = <div> <StatusBadge status={info} /></div>
    }
    else if (isPriority) {
        content = <div><PriorityBadge priority={info} /> </div>
    }
    else {
        content = <div className="font-medium">{info}</div>
    }



    return (
        <div className=" grid grid-cols-[180px_1fr] gap-2 tracking-wider text-sm">
            <div className="flex text-gray-600 gap-2 items-center">
                <Icon className="size-6 shirnk-0" />
                <div className=" font-medium">{title}</div>
            </div>
            {content}
        </div>
    )
}