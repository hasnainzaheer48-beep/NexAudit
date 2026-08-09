import useComements from "../../hooks/useComments"
import CommentCard from "./commentCard";

export default function ShowTaskComments({ taskId }) {

    const { loading, error, comments, getComments, setComments } = useComements(taskId);

    if (loading) return null;
    if (error) return console.log(error);

    const onDelete = (commentId) => {
        setDocuments((prev) => {
            return prev.filter((comment) => comment.id !== commentId)
        });
    }




    return (
        <div className="p-2">
            {
                comments.map((comment) => {
                    return <CommentCard key={comment.id} onDelete={onDelete} comment={comment} />
                })
            }
        </div>
    )
}