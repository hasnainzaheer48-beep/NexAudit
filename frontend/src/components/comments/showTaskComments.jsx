
import CommentCard from "./commentCard";

export default function ShowTaskComments({ taskId, comments, setComments, getComments }) {





    const onDelete = (commentId) => {
        setComments((prev) => {
            return prev.filter((comment) => comment.id !== commentId)
        });
    }




    return (
        <div className="p-2 flex flex-col gap-3">
            {
                comments.map((comment) => {
                    return <CommentCard key={comment.id} onDelete={onDelete} comment={comment} getComments={getComments} />
                })
            }
        </div>
    )
}