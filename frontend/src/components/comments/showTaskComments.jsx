
import CommentCard from "./commentCard";

export default function ShowTaskComments({ comments, setComments, getComments }) {





    const onDelete = (commentId) => {
        setComments((prev) => {
            return prev.filter((comment) => comment.id !== commentId)
        });
    }

    return (
        <div className=" flex flex-col border-[#cbcbcb] overflow-auto ">
            {
                comments.map((comment) => {
                    return <CommentCard key={comment.id} onDelete={onDelete} comment={comment} getComments={getComments} />
                })
            }

        </div>
    )
}