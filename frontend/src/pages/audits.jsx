import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import useAudits from "../hooks/useAudits";
import api from "../api/axios";
import LoadingComponent from "../components/ui/loadingComponent";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import TableCell from "../components/ui/table/tableCell";
import PriorityBadge from "../components/ui/table/priorityBadge";
import StatusBadge from "../components/ui/table/statusBadge";
import PageTitle from "../components/ui/pageTitle";
import EmptyTable from "../components/ui/table/emptyTable";
import Button from "../components/ui/button";
import ConfirmModal from "../components/ui/ConfirmModal";



export default function Audits() {

    const { loading, error, audits, getAudits, setAudits } = useAudits();
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedAudit, setSelectedAudit] = useState(null);

    const navigate = useNavigate();

    const handleClose = () => {
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
        return <>{error}</>
    }


    return (
        <div className="flex flex-col h-full">
            <PageTitle title={"Audits"} subtitle="View ongoing and completed audits in one place." />

            <div className="flex-1 min-h-0">
                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>CLient Id</TableHead>
                            <TableHead>Template Id</TableHead>
                            <TableHead>Manager</TableHead>


                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>

                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {audits.length === 0 ? <EmptyTable message={"No Audits"} /> :
                            audits.map((audit) => {
                                return (
                                    <TableRow key={audit.id}>
                                        <TableCell>{audit.id}</TableCell>
                                        <TableCell>{audit.client}</TableCell>
                                        <TableCell>{audit.template}</TableCell>
                                        <TableCell>{audit.manager}</TableCell>

                                        <TableCell><PriorityBadge priority={audit.priority} /></TableCell>
                                        <TableCell><StatusBadge status={audit.status} /></TableCell>



                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button variant="Details" icon="Details" iconSize="Small" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</Button>
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
                <ConfirmModal
                    isOpen={showDeleteModal}
                    onClose={handleClose}
                    onConfirm={() => { return handleArchive(selectedAudit) }}
                    selectedEntity={selectedAudit}
                    title="Archive Audit"
                    message="Are you sure you want to Archive this Audit ?"
                    action="Archive"
                />
            </div>




        </div>
    );
}