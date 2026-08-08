import { useParams } from "react-router-dom"

export default function TaskDetails() {

    const { taskId } = useParams();

    return (
        <div>Details of Task {taskId} </div>
    )
}