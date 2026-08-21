import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuditsFormModal from "../components/audits/auditsFormModal";
import useAuditByManager from "../hooks/useAuditsByManager";
import api from "../api/axios";
import LoadingComponent from "../components/ui/loadingComponent";
import PageTitle from "../components/ui/pageTitle";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import EmptyTable from "../components/ui/table/emptyTable";
import TableCell from "../components/ui/table/tableCell";
import PriorityBadge from "../components/ui/table/priorityBadge";
import StatusBadge from "../components/ui/table/statusBadge";
import Button from "../components/ui/button";
import ConfirmModal from "../components/ui/ConfirmModal";
import Pagination from "../components/ui/pagination";



export default function AuditsByManager() {

    const [page, setPage] = useState(1)
    const { loading, error, pagination, audits, getAuditsByManager, setAudits } = useAuditByManager(page, 10);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedAudit, setSelectedAudit] = useState(null);
    const navigate = useNavigate();

    const handleCreateAudit = () => {
        setShowModal(true);
        setSelectedAudit(null);
    }

    const handleClose = () => {
        setShowModal(false);
        setShowDeleteModal(false)
    }


    const handleArchive = async (audit) => {
        try {

            const auditId = audit.id;
            await api.patch(`/api/audits/archive/${auditId}`);
            setAudits((prev) => {
                return prev.filter((audit) => audit.id !== auditId);
            })
            setShowDeleteModal(false);


        } catch (error) {
            console.error(error);

        }
    }

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <>{error.message}</>
    }



    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <PageTitle title={"Audits"} subtitle="Manage ongoing and completed audits in one place." />
                <Button size="Large" onClick={handleCreateAudit}>
                    Create Audit
                </Button>

            </div>

            <div className="flex-1 min-h-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Id</TableHead>
                            <TableHead >CLient Id</TableHead>
                            <TableHead >Template Id</TableHead>



                            <TableHead >Priority</TableHead>
                            <TableHead >Status</TableHead>

                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {audits.length === 0 ? <EmptyTable /> :
                            audits.map((audit) => {
                                return (
                                    <TableRow key={audit.id}>
                                        <TableCell>{audit.id}</TableCell>
                                        <TableCell>{audit.client}</TableCell>
                                        <TableCell>{audit.template}</TableCell>


                                        <TableCell><PriorityBadge priority={audit.priority} /></TableCell>
                                        <TableCell><StatusBadge status={audit.status} /></TableCell>



                                        <TableCell>
                                            <div className="flex gap-2">

                                                <Button icon="Edit" variant="Edit" iconSize="Small" onClick={() => {
                                                    setSelectedAudit(audit);
                                                    setShowModal(true);
                                                }}>Edit</Button>

                                                <Button icon="Details" iconSize="Small" variant="Details" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</Button>
                                                <Button icon="Archive" iconSize="Small" variant="Archive/Deactivate" onClick={() => {
                                                    setShowDeleteModal(true)
                                                    setSelectedAudit(audit)
                                                }} >Archive</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <AuditsFormModal isOpen={showModal} selectedAudit={selectedAudit} onClose={handleClose} onAuditCreated={getAuditsByManager} />
                <ConfirmModal
                    isOpen={showDeleteModal}
                    onClose={handleClose}
                    onConfirm={() => { return handleArchive(selectedAudit) }}

                    title="Archive Audit"
                    message="Are you sure you want to Archive this Audit ?"
                    action="Archive"
                />
            </div>
            <Pagination pagination={pagination} onPageChange={setPage} />
        </div>

    )
}