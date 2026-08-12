import { useParams } from "react-router-dom"
import useAuditProgress from "../hooks/useAuditProgress";
import useTasksByAudit from "../hooks/useTasksByAudit";
import AuditTasksTable from "../components/audits/auditTasksTable";
import api from "../api/axios";
import useAuditById from "../hooks/useAuditById";





export default function AuditDetails() {

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
        return <div>Loading</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div>
                <div>{audit.client}</div>
                <hr />
                <div>
                    Status: {audit.status} <br />
                    Manager: {audit.manager} <br />
                    Template: {audit.template} <br />
                    Year: {audit.audit_year} <br />
                    Priority: {audit.priority}  <br />
                    Progress: {auditProgress.progress} <br />

                </div>
            </div>
            <br />
            <div>
                <div>Tasks</div>
                <hr />
                <AuditTasksTable tasks={tasks} getTasks={getTasksByAudit} />
            </div>
            <br />
            <div>
                <div>Progress</div>
                <hr />
                <div>{auditProgress.finished_task} / {auditProgress.total_task} <br />
                    {auditProgress.progress} </div>
            </div>
            <br />
            <button
                disabled={auditProgress.progress !== 100 || audit.status === "Finished"}
                className="border"
                onClick={handleFinishAudit}
            >{audit.status === "Finished" ? "Audit Completed" : "Finish Audit"}</button>

        </div>
    )
}