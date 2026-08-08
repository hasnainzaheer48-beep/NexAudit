import DocumentCard from "./documentCard";

export default function ShowTaskDocuments({ taskId }) {
    return (
        <div>
            < DocumentCard taskId={taskId} />
        </div>
    )
}