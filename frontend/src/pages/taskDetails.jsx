import { useNavigate, useParams } from "react-router-dom"



import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Documents from "../components/documents/documents";

import Comments from "../components/comments/comments";
import useTaskById from "../hooks/useTaskById";
import TaskTitle from "../components/taskDetails/taskTitle";
import TaskInfoCard from "../components/taskDetails/taskInfoCard";
import ExtraDetails from "../components/taskDetails/extraDetails";

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
        <div className="flex flex-col gap-5 pb-6  min-h-full">
            <div>
                <button onClick={() => navigate(-1)} className="font-bold text-xs hover:cursor-pointer hover:underline text-[#174d38] tracking-wide ">Go Back</button>
            </div>
            <TaskTitle title={task.title} status={task.status} />
            <div>
                <TaskInfoCard task={task} />
            </div>

            <div>
                <Documents user={user} taskId={taskId} getTask={getTask} />
            </div>
            <div>
                <Comments taskId={taskId} />
            </div>


            <div>
                <ExtraDetails task={task} />
            </div>


        </div>
    )
}