import { useNavigate, useParams } from "react-router-dom"
import useAuditProgress from "../hooks/useAuditProgress";
import useTasksByAudit from "../hooks/useTasksByAudit";
import AuditTasksTable from "../components/audits/auditTasksTable";
import api from "../api/axios";
import useAuditById from "../hooks/useAuditById";
import LoadingComponent from "../components/ui/loadingComponent";
import AuditInfo from "../components/auditDetails/auditInfo";
import PageTitle from "../components/ui/pageTitle";
import ProgressCard from "../components/auditDetails/ProgressCard";
import Button from "../components/ui/button";
import { useState } from "react";
import AuditsFormModal from "../components/audits/auditsFormModal";



export default function AuditDetails() {

    const navigate = useNavigate();
    const { auditId } = useParams();
    const { audit, getAudit, error, loading: auditLoading } = useAuditById(auditId);
    const { auditProgress, getAuditprogress, loading: progressLoading } = useAuditProgress(auditId);
    const { tasks, getTasksByAudit, loading: tasksLoading } = useTasksByAudit(auditId);
    const [showModal, setShowModal] = useState(false);
    console.log(auditProgress);

    const handleFinishAudit = async () => {
        try {
            await api.patch(`/api/audits/${auditId}/complete`);
            getAudit();
            getAuditprogress();
            getTasksByAudit();
        }
        catch (error) {
            console.error(error);
            alert(error.response?.data || "Failed to finish audit.");
        }
    }

    const handleClose = () => {
        setShowModal(false);
    }



    if (auditLoading || progressLoading || tasksLoading) {
        return <LoadingComponent />
    }

    if (error) {
        return <div>{error}</div>
    }

    return (

        <div className="flex flex-col gap-10 h-full">
            <div className="flex justify-between">
                <button onClick={() => navigate(-1)} className="font-bold text-xs hover:cursor-pointer hover:underline text-[#174d38] tracking-wide ">Back to Audits</button>
                <Button variant="Edit" size="Normal" icon="Edit" iconSize="Small" onClick={() => { setShowModal(true) }} >Edit</Button>
            </div>
            <AuditInfo audit={audit} progress={auditProgress.progress} />
            <div className="border border-[#cbcbcb] rounded-2xl">
                <PageTitle title={"Tasks"} variant="Details" color="text-black" />
                <AuditTasksTable tasks={tasks} getTasks={getTasksByAudit} />
            </div>
            <ProgressCard progress={auditProgress.progress} finished_task={auditProgress.finished_task} total_task={auditProgress.total_task} onClick={handleFinishAudit} auditStatus={audit.status} />
            <AuditsFormModal isOpen={showModal} selectedAudit={audit} onClose={handleClose} onAuditCreated={getAudit} />
        </div>
    )
}