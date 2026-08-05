import { useState } from "react";
import useAuditTemplates from "../hooks/useAuditTemplates";
import AuditTemplatesFormModal from "../components/auditTemplates/auditTemplatesFormModal";



export default function AuditTemplates() {

    const { loading, error, auditTemplates, getAuditTemplates } = useAuditTemplates();
    const [showModal, setShowModal] = useState(false);
    const [selectedAuditTemplate, setSelectedAuditTemplate] = useState(null);

    const handleCreateAuditTemplate = () => {
        setShowModal(true);
        setSelectedAuditTemplate(null);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        return <>{error.message}</>
    }


    return (
        <div>
            <button className="border" onClick={handleCreateAuditTemplate}>Create Audit Template</button>

            <table className="mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">Name</th>
                        <th className="border px-4 py-3">Description</th>
                        <th className="border px-4 py-3">Audit Type</th>
                        <th className="border px-4 py-3">Version</th>
                        <th className="border px-4 py-3">Is Active</th>
                        <th className="border px-4 py-3">Created At</th>
                        <th className="border px-4 py-3">Updated At</th>
                        <th className="border px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        auditTemplates.map((auditTemplate) => {
                            return (
                                <tr key={auditTemplate.id}>
                                    <td className="border px-4 py-3">{auditTemplate.id}</td>
                                    <td className="border px-4 py-3">{auditTemplate.name}</td>
                                    <td className="border px-4 py-3">{auditTemplate.description}</td>
                                    <td className="border px-4 py-3">{auditTemplate.audit_type}</td>
                                    <td className="border px-4 py-3">{auditTemplate.version}</td>
                                    <td className="border px-4 py-3">{String(auditTemplate.is_active)}</td>
                                    <td className="border px-4 py-3">{new Date(auditTemplate.created_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3">{new Date(auditTemplate.updated_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3"><button onClick={() => {
                                        setSelectedAuditTemplate(auditTemplate);
                                        setShowModal(true);
                                    }}>Edit</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <AuditTemplatesFormModal isOpen={showModal} selectedAuditTemplate={selectedAuditTemplate} onClose={handleClose} onAuditTemplateCreated={getAuditTemplates} />
        </div>




    );
}