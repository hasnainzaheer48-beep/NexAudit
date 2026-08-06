import { useParams } from "react-router-dom"
import useAudit from "../hooks/useAudit";
import useAuditProgress from "../hooks/useAuditProgress";
import useTask from "../hooks/useTasksByAudit";
import useTasksByAudit from "../hooks/useTasksByAudit";
import AuditTasksTable from "../components/audits/auditTasksTable";




export default function AuditDetails() {

    const { auditId } = useParams();
    const { audit, getAudit, error, loading } = useAudit(auditId);
    const { auditProgress, getAuditprogress } = useAuditProgress(auditId);
    const { tasks, getTasksByAudit } = useTasksByAudit(auditId);
    console.log(tasks)

    if (loading) {
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
        </div>
    )
}