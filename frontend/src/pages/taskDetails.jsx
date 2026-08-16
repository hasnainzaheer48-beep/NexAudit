import { useNavigate, useParams } from "react-router-dom"
import UploadDocumentFormModal from "../components/documents/uploadDocumentFormModal";
import { useState } from "react";
import ShowTaskDocuments from "../components/documents/showTaskDocuments";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ShowTaskComments from "../components/comments/showTaskComments";
import Documents from "../components/documents/documents";
import CreateCommentFormModal from "../components/comments/createCommentFormModal";
import Comments from "../components/comments/comments";
import useTaskById from "../hooks/useTaskById";
import TaskTitle from "../components/taskDetails/taskTitle";
import TaskInfoCard from "../components/taskDetails/taskInfoCard";

export default function TaskDetails() {

    const { taskId } = useParams();
    const { loading, error, task, getTask } = useTaskById(taskId);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    if (loading) {
        return null;
    }

    if (error) {
        return error;
    }

    return (
        <div className="flex flex-col gap-4">
            <div>
                <button onClick={() => navigate(-1)} className="font-bold text-xs hover:cursor-pointer hover:underline text-[#174d38] tracking-wide ">Go Back</button>
            </div>
            <TaskTitle title={task.title} status={task.status} />

            <div>
                <TaskInfoCard task={task} />
            </div>




            {/* Documents Upload and View */}
            <div>
                <Documents user={user} taskId={taskId} getTask={getTask} />
            </div>

            {/* ------------------------------------------------- */}

            {/* ---------------Comments-------------- */}
            <Comments taskId={taskId} />

            <br /><hr />
            {/* ------------------------------------------------ */}
            <div>More Details</div><br />
            <div>Task Id: {task.id}</div><br />
            <div>Audit Id:  {task.audit_id}</div><br />
            <div>Template Task Id: {task.template_task_id} </div><br />
            <div>Assigned Auditor Id:  {task.assigned_auditor_id}</div><br />


        </div>
    )
}