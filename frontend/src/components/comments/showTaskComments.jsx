
import CommentCard from "./commentCard";

export default function ShowTaskComments({ taskId, comments }) {





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