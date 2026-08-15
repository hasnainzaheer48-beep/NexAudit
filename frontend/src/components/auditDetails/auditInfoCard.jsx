import PriorityBadge from "../ui/table/priorityBadge";
import StatusBadge from "../ui/table/statusBadge";


export default function AuditInfoCard({ title, info, isStatus = false, isPriority = false, isProgress = false }) {

    let infoComponent;

    if (isStatus) {
        infoComponent = <StatusBadge status={info} />
    }
    else if (isPriority) {
        infoComponent = <PriorityBadge priority={info} />
    }
    else if (isProgress) {
        infoComponent = <div className=" font-semibold text-[#174d38]">{info}%</div>
    }
    else {
        infoComponent = <div className="font-semibold">{info}</div>
    }

    return (
        <div className="px-3 flex flex-col items-center">
            <div className=" font-medium text-sm text-gray-700 ">{title}</div>
            {
                infoComponent
            }

        </div>
    )
}