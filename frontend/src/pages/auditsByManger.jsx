import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuditsFormModal from "../components/audits/auditsFormModal";
import useAuditByManager from "../hooks/useAuditsByManager";
import api from "../api/axios";



export default function AuditsByManager() {

    const { loading, error, audits, getAuditsByManager } = useAuditByManager();
    const [showModal, setShowModal] = useState(false);
    const [selectedAudit, setSelectedAudit] = useState(null);
    const navigate = useNavigate();

    const handleCreateAudit = () => {
        setShowModal(true);
        setSelectedAudit(null);
    }

    const handleClose = () => {
        setShowModal(false);
    }


    const handleArchive = async (audit) => {
        try {

            const auditId = audit.id;
            await api.patch(`/api/audits/archive/${auditId}`);
            setAudits((prev) => {
                return prev.filter((audit) => audit.id !== auditId);
            })



        } catch (error) {
            console.error(error);

        }
    }

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        return <>{error.message}</>
    }



    return (
        <div>
            <button className="border" onClick={handleCreateAudit}>Create Audit</button>

            <table className="mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">CLient Id</th>
                        <th className="border px-4 py-3">Template Id</th>



                        <th className="border px-4 py-3">Priority</th>
                        <th className="border px-4 py-3">Status</th>

                        <th className="border px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        audits.map((audit) => {
                            return (
                                <tr key={audit.id}>
                                    <td className="border px-4 py-3">{audit.id}</td>
                                    <td className="border px-4 py-3">{audit.client}</td>
                                    <td className="border px-4 py-3">{audit.template}</td>


                                    <td className="border px-4 py-3">{audit.priority}</td>
                                    <td className="border px-4 py-3">{audit.status}</td>



                                    <td className="border px-4 py-3">

                                        <button className="border px-2 mr-1" onClick={() => {
                                            setSelectedAudit(audit);
                                            setShowModal(true);
                                        }}>Edit</button>

                                        <button className="border px-2 mr-1" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</button>
                                        <button onClick={() => {
                                            return handleArchive(audit)
                                        }} >Archive</button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <AuditsFormModal isOpen={showModal} selectedAudit={selectedAudit} onClose={handleClose} onAuditCreated={getAuditsByManager} />
        </div>

    )
}