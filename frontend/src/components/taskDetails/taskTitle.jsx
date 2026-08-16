import { ListCheck } from "lucide-react";
import StatusBadge from "../ui/table/statusBadge";

export default function TaskTitle({ status, title }) {
    return (
        <div className="flex p-2 gap-4">
            <div className="bg-green-50 size-20 text-[#174d38] p-1 rounded-lg flex justify-center items-center "><ListCheck className="size-15" /></div>
            <div className="border-r border-[#cbcbcb]" />
            <div className="flex-1 flex flex-col justify-between ">
                <div className="text-2xl font-bold">Task Details</div>
                <div className="flex items-center gap-1">
                    <div className="text-lg font-medium">{title}</div>
                    <div><StatusBadge status={status} /></div>
                </div>
            </div>
        </div>
    )
}