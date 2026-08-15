import { ClipboardCheck } from "lucide-react";
import PageTitle from "../ui/pageTitle";
import ProgressCircle from "./ProgressCircle";
import ProgressStat from "./ProgressStat";

export default function ProgressCard({ total_task, finished_task, progress, onClick, auditStatus }) {
    return (
        <div className="border border-[#cbcbcb] rounded-2xl flex flex-col">
            <PageTitle title={"Progress"} color="text-black" variant="Details" />

            <hr className="text-[#cbcbcb]" />
            <div className="p-5 flex-1 flex min-h-0 gap-5">
                <div className="flex flex-col items-center justify-center">
                    <ProgressCircle progress={progress} />
                    <div className="text-sm font-semibold">Overall Progress</div>
                </div>
                <div className="border-r border-[#cbcbcb]" />
                <div className="flex-1 flex flex-col gap-6  justify-center">
                    <ProgressStat progress={finished_task} subtitle={"Completed"} />
                    <div className="flex justify-between ">
                        <ProgressStat progress={total_task - finished_task} subtitle={"Pending"} />
                        <button
                            disabled={progress !== 100 || auditStatus === "Finished"}
                            className="bg-[#174d38] text-white p-2 rounded-xl tracking-wider font-medium hover:cursor-pointer hover:bg-[#123d2d] transition"
                            onClick={onClick}
                        >{auditStatus === "Finished" ? "Audit Completed" : "Finish Audit"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}