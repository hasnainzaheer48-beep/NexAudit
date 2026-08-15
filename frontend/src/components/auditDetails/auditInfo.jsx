import { FileChartColumnIncreasing } from "lucide-react";
import StatusBadge from "../ui/table/statusBadge";

export default function AuditInfo({ audit, progress }) {
    return (
        <div className="flex items-center gap-6 p-2">
            <div className="bg-green-100 size-22 text-[#174d38] p-1 rounded-lg flex justify-center items-center ">
                <FileChartColumnIncreasing className="size-15" />
            </div>
            <div className="flex-1 flex flex-col min-h-0">
                <div className="text-2xl font-bold">{audit.client}</div>
                <div className="flex justify-evenly">
                    <div className="px-3">
                        <div className=" font-medium text-sm text-gray-700 ">Status</div>
                        <StatusBadge status={audit.status} />
                    </div>
                    <div className="border-r border-[#cbcbcb]" />
                    <div className="px-3">
                        <div>Manager</div>
                        <div>{audit.manager}</div>
                    </div>
                    <div className="border-r border-[#cbcbcb]" />
                    <div className="px-3">
                        <div>Template</div>
                        <div>{audit.template}</div>
                    </div>
                    <div className="border-r border-[#cbcbcb]" />
                    <div className="px-3">
                        <div>Year</div>
                        <div>{audit.audit_year}</div>
                    </div>
                    <div className="border-r border-[#cbcbcb]" />
                    <div className="px-3">
                        <div>Priority</div>
                        <div>{audit.priority}</div>
                    </div>
                    <div className="border-r border-[#cbcbcb]" />
                    <div className="px-3">
                        <div>Progress</div>
                        <div>{progress}%</div>
                    </div>

                </div>
            </div>
        </div>
    )
}