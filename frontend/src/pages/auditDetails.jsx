import { useNavigate, useParams } from "react-router-dom"
import useAuditProgress from "../hooks/useAuditProgress";
import useTasksByAudit from "../hooks/useTasksByAudit";
import AuditTasksTable from "../components/audits/auditTasksTable";
import api from "../api/axios";
import useAuditById from "../hooks/useAuditById";
import LoadingComponent from "../components/ui/loadingComponent";
import AuditInfo from "../components/auditDetails/auditInfo";
import PageTitle from "../components/ui/pageTitle";
import ProgressCard from "../components/auditDetails/ProgressCard";





export default function AuditDetails() {

    const navigate = useNavigate();
    const { auditId } = useParams();
    const { audit, getAudit, error, loading: auditLoading } = useAuditById(auditId);
    const { auditProgress, getAuditprogress, loading: progressLoading } = useAuditProgress(auditId);
    const { tasks, getTasksByAudit, loading: tasksLoading } = useTasksByAudit(auditId);
    console.log(auditProgress);

    const handleFinishAudit = async () => {
        try {
            await api.patch(`/api/audits/${auditId}/complete`);
            getAudit();
            getAuditprogress();
            getTasksByAudit();
        }
        catch (error) {
            console.error(error);
            alert(error.response?.data || "Failed to finish audit.");
        }
    }



    if (auditLoading || progressLoading || tasksLoading) {
        return <LoadingComponent />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (

        <div>
            <button onClick={() => navigate(-1)} className="font-bold text-xs hover:cursor-pointer hover:underline text-[#174d38] tracking-wide ">Back to Audits</button>
            <AuditInfo audit={audit} progress={auditProgress.progress} />
            <div className="border border-[#cbcbcb] rounded-2xl mt-10">
                <PageTitle title={"Tasks"} variant="Details" color="text-black" />
                <AuditTasksTable tasks={tasks} getTasks={getTasksByAudit} />
            </div>
            <ProgressCard progress={auditProgress.progress} finished_task={auditProgress.finished_task} total_task={auditProgress.total_task} />

            <br />
            <button
                disabled={auditProgress.progress !== 100 || audit.status === "Finished"}
                className="border"
                onClick={handleFinishAudit}
            >{audit.status === "Finished" ? "Audit Completed" : "Finish Audit"}</button>

        </div>
    )
}