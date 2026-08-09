import { useParams } from "react-router-dom"
import useTask from "../hooks/useTask";
import UploadDocumentFormModal from "../components/documents/uploadDocumentFormModal";
import { useState } from "react";
import ShowTaskDocuments from "../components/documents/showTaskDocuments";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ShowTaskComments from "../components/comments/showTaskComments";
import Documents from "../components/documents/documents";

export default function TaskDetails() {

    const { taskId } = useParams();
    const { loading, error, task, getTask } = useTask(taskId);
    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);


    const handleCreate = () => {
        setShowModal(true);
    }


    const handleClose = () => {
        setShowModal(false);
    }


    if (loading) {
        return null;
    }

    if (error) {
        return error;
    }

    return (
        <>
            <div>Task Details</div><hr />
            <div>

                {/* Basic Info */}
                <div>Title: {task.title}</div><br />
                <div>Company: {task.company}</div><br />
                <div>Assigned Auditor: {task.assigned_auditor}</div><br />
                <div>Description: {task.description}</div><br />
                <div>Start Date: {task.start_date ? new Date(task.start_date).toLocaleDateString() : '-'}</div><br />
                <div>Due Date: {task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'}</div><br />
                <div>Completed At: {task.completed ? new Date(task.completed_at).toLocaleDateString() : "-"}</div><br />
                <div>Created At: {new Date(task.created_at).toLocaleDateString()}</div><br />
                <div>Updated At: {task.updated_at ? new Date(task.updated_at).toLocaleDateString() : '-'}</div><br />
                <hr />
                <div>Status: {task.status} </div><br />
                <div>Priority: {task.priority}</div><br />
                <hr />
                {/* --------------------------------- */}



                {/* Documents Upload and View */}
                <div>Documents</div>
                <Documents user={user} taskId={taskId} getTask={getTask} />
                <hr />
                {/* ------------------------------------------------- */}

                {/* ---------------Comments-------------- */}
                <div id="Comment-Section" className="flex flex-col">
                    <div id="Comment-Section-Header" className="flex items-center justify-between p-2 px-3">
                        <div className="font-bold">Comments</div>
                        <div><button className="border p-1 font-semibold" onClick={handleCreate}>Create Comment</button></div>
                    </div>
                    <div id="Comment-Cards-Box" className="flex-1">
                        <ShowTaskComments taskId={taskId} />
                    </div>
                </div>

                <br /><hr />
                {/* ------------------------------------------------ */}
                <div>More Details</div><br />
                <div>Task Id: {task.id}</div><br />
                <div>Audit Id:  {task.audit_id}</div><br />
                <div>Template Task Id: {task.template_task_id} </div><br />
                <div>Assigned Auditor Id:  {task.assigned_auditor_id}</div><br />

            </div>
        </>
    )
}