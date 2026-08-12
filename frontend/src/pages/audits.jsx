import { useContext, useState } from "react";
import AuditsFormModal from "../components/audits/auditsFormModal";
import { useNavigate } from 'react-router-dom'
import useAudits from "../hooks/useAudits";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";


export default function Audits() {

    const { loading, error, audits, getAudits, setAudits } = useAudits();
    const [showModal, setShowModal] = useState(false);
    const [selectedAudit, setSelectedAudit] = useState(null);
    const { user } = useContext(AuthContext);

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
        return <>{error}</>
    }


    return (
        <div>
            {(user?.role === "MANAGER") && <button className="border" onClick={handleCreateAudit}>Create Audit</button>}

            <table className="mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">CLient Id</th>
                        <th className="border px-4 py-3">Template Id</th>
                        <th className="border px-4 py-3">Manager</th>


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
                                    <td className="border px-4 py-3">{audit.manager}</td>

                                    <td className="border px-4 py-3">{audit.priority}</td>
                                    <td className="border px-4 py-3">{audit.status}</td>



                                    <td className="border px-4 py-3">
                                        {(user?.role === "MANAGER") &&
                                            <button className="border px-2 mr-1" onClick={() => {
                                                setSelectedAudit(audit);
                                                setShowModal(true);
                                            }}>Edit</button>}

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
            <AuditsFormModal isOpen={showModal} selectedAudit={selectedAudit} onClose={handleClose} onAuditCreated={getAudits} />
        </div>




    );
}