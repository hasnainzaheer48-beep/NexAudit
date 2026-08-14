import { useContext, useState } from "react";
import AuditsFormModal from "../components/audits/auditsFormModal";
import { useNavigate } from 'react-router-dom'
import useAudits from "../hooks/useAudits";
import { AuthContext } from "../context/AuthContext";
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
        return <LoadingComponent />
    }

    if (error) {
        return <>{error}</>
    }


    return (
        <div className="flex flex-col h-full">
            <PageTitle title={"Audits"} subtitle="View ongoing and completed audits in one place." />
            <div className="flex-1 min-h-0">
                {(user?.role === "MANAGER") && <button className="border" onClick={handleCreateAudit}>Create Audit</button>}

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
                                            {(user?.role === "MANAGER") &&
                                                <button className="border px-2 mr-1" onClick={() => {
                                                    setSelectedAudit(audit);
                                                    setShowModal(true);
                                                }}>Edit</button>}

                                            <button className="border px-2 mr-1" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</button>
                                            <button onClick={() => {
                                                return handleArchive(audit)
                                            }} >Archive</button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <AuditsFormModal isOpen={showModal} selectedAudit={selectedAudit} onClose={handleClose} onAuditCreated={getAudits} />
            </div>




        </div>
    );
}