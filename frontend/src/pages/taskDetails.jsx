import { useParams } from "react-router-dom"
import useTask from "../hooks/useTask";

export default function TaskDetails() {

    const { taskId } = useParams();
    const { loading, error, task, getTask } = useTask(taskId);

    if (loading) {
        return null;
    }

    if (error) {
        return error;
    }

    return (
        <div>Details of Task {taskId} </div>
    )
}