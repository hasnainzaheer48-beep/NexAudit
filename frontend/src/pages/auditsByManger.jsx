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
        return <LoadingComponent />
    }

    if (error) {
        return <>{error.message}</>
    }



    return (
        <div>
            <PageTitle title={"Audits"} />
            <div>

                <button className="border" onClick={handleCreateAudit}>Create Audit</button>

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

                                            <button className="border px-2 mr-1" onClick={() => {
                                                setSelectedAudit(audit);
                                                setShowModal(true);
                                            }}>Edit</button>

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
                <AuditsFormModal isOpen={showModal} selectedAudit={selectedAudit} onClose={handleClose} onAuditCreated={getAuditsByManager} />
            </div>
        </div>

    )
}