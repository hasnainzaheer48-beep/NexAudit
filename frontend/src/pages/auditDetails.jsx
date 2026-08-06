import { useParams } from "react-router-dom"
import useAudit from "../hooks/useAudit";



export default function AuditDetails() {

    const { auditId } = useParams();
    const { audit, getAudit, error, loading } = useAudit(auditId);

    if (loading) {
        return <div>Loading</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <dir>
            <div>
                <div>{audit.client}</div>
                <hr />
                <div>
                    Status: {audit.status} <br />
                    Manager: {audit.manager} <br />
                    Template: {audit.template} <br />
                    Year: {audit.audit_year} <br />
                    Priority: {audit.priority}  <br />
                    Progress<br />

                </div>


            </div>
        </dir>
    )
}