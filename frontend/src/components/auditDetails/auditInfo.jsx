import { FileChartColumnIncreasing } from "lucide-react";
import AuditInfoCard from "./auditInfoCard";

export default function AuditInfo({ audit, progress }) {
    return (
        <div className="flex items-center gap-6 p-2">
            <div className="bg-green-50 size-22 text-[#174d38] p-1 rounded-lg flex justify-center items-center ">
                <FileChartColumnIncreasing className="size-15" />
            </div>
            <div className="flex-1 gap-2 flex flex-col min-h-0">
                <div className="text-2xl font-bold">{audit.client}</div>
                <div className="flex justify-evenly">
                    <AuditInfoCard title={"Status"} info={audit.status} isStatus={true} />
                    <div className="border-r border-[#cbcbcb]" />
                    <AuditInfoCard title={"Manager"} info={audit.manager} />
                    <div className="border-r border-[#cbcbcb]" />
                    <AuditInfoCard title={"Template"} info={audit.template} />
                    <div className="border-r border-[#cbcbcb]" />
                    <AuditInfoCard title={"Year"} info={audit.audit_year} />
                    <div className="border-r border-[#cbcbcb]" />
                    <AuditInfoCard title={"Priority"} info={audit.priority} isPriority={true} />
                    <div className="border-r border-[#cbcbcb]" />
                    <AuditInfoCard title={"Progress"} info={progress} isProgress={true} />

                </div>
            </div>
        </div>
    )
}