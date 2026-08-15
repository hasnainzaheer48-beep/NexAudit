import { useState } from "react";
import useAuditTemplates from "../hooks/useAuditTemplates";
import AuditTemplatesFormModal from "../components/auditTemplates/auditTemplatesFormModal";
import { useNavigate } from 'react-router-dom'
import api from "../api/axios";
import LoadingComponent from '../components/ui/loadingComponent'
import PageTitle from "../components/ui/pageTitle";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableCell from "../components/ui/table/tableCell";
import TableHead from "../components/ui/table/tableHead";
import EmptyTable from "../components/ui/table/emptyTable";
import Button from "../components/ui/button";
import { Plus } from "lucide-react";

export default function AuditTemplates() {

    const { loading, error, auditTemplates, getAuditTemplates, setAuditTemplates } = useAuditTemplates();
    const [showModal, setShowModal] = useState(false);
    const [selectedAuditTemplate, setSelectedAuditTemplate] = useState(null);

    const navigate = useNavigate();

    const handleCreateAuditTemplate = () => {
        setShowModal(true);
        setSelectedAuditTemplate(null);
    }

    const handleDeactivate = async (auditTemplate) => {
        try {

            const auditTemplateId = auditTemplate.id;
            await api.patch(`/api/audit-templates/deactivate/${auditTemplateId}`);
            setAuditTemplates((prev) => {
                return prev.filter((auditTemplate) => auditTemplate.id !== auditTemplateId);
            })



        } catch (error) {
            console.error(error);

        }
    }


    const handleClose = () => {
        setShowModal(false);
    }

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <>{error.message}</>
    }


    return (
        <div className="flex flex-col h-full gap-2">

            <div className="flex justify-between items-center">

                <PageTitle title={"Audit Templates"} subtitle="Create and manage reusable audit templates" />
                <Button size="Large" onClick={handleCreateAuditTemplate}>
                    Create Template
                </Button>
            </div>

            <div className="flex-1 min-h-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Audit Type</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Is Active</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {auditTemplates.length === 0 ? <EmptyTable /> :
                            auditTemplates.map((auditTemplate) => {
                                return (
                                    <TableRow key={auditTemplate.id}>
                                        <TableCell>{auditTemplate.id}</TableCell>
                                        <TableCell>{auditTemplate.name}</TableCell>
                                        <TableCell>{auditTemplate.description}</TableCell>
                                        <TableCell>{auditTemplate.audit_type}</TableCell>
                                        <TableCell>{auditTemplate.version}</TableCell>
                                        <TableCell>{String(auditTemplate.is_active)}</TableCell>
                                        <TableCell>{new Date(auditTemplate.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(auditTemplate.updated_at).toLocaleDateString()}</TableCell>
                                        <TableCell><Button icon="Edit" variant="Edit" iconSize="Small" onClick={() => {
                                            setSelectedAuditTemplate(auditTemplate);
                                            setShowModal(true);
                                        }}>Edit</Button>
                                            <Button icon="Task" iconSize="Small" variant="Details" onClick={() => {
                                                navigate(`/audit-templates/${auditTemplate.id}/tasks`)
                                            }}>Tasks</Button>
                                            <Button icon="Archive" iconSize="Small" variant="Archive/Deactivate" onClick={() => {
                                                return handleDeactivate(auditTemplate)
                                            }} >Deactivate</Button>

                                        </TableCell>

                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <AuditTemplatesFormModal isOpen={showModal} selectedAuditTemplate={selectedAuditTemplate} onClose={handleClose} onAuditTemplateCreated={getAuditTemplates} />
            </div>

        </div>



    );
}