import { useContext, useState } from "react";
import EditCommentFormModal from "./editCommentFormModal";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";


export default function CommentCard({ comment, onDelete, getComments }) {

    const [showModal, setShowModal] = useState(false);
    const { user } = useContext(AuthContext);




    const handleEdit = () => {
        setShowModal(true);
    }


    const handleClose = () => {
        setShowModal(false);
    }

    const handleDelete = async () => {
        try {
            await api.patch(`/api/comments/${comment.id}/delete`);
            onDelete(comment.id);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex p-2 border-b border-[#cbcbcb] last:border-b-0 ">
            <div id="Content" className="flex-1 flex flex-col pt-0">
                <div id="Commenter Info" className="font-light text-sm">
                    {comment.user} • {comment.role.toLowerCase()} • {new Date(comment.created_at).toLocaleString()}
                </div>
                <div id="Comment" className="flex-1 p-2 bg-white text-sm ">
                    {comment.content}
                </div>
            </div>

            {
                user.id === comment.user_id && <div id="Action Buttons" className="flex flex-col gap-2 p-1">
                    <button className="border p-1 px-6" onClick={handleEdit}>Edit</button>
                    <button className="border p-1" onClick={handleDelete} >Delete</button>
                </div>
            }

            <EditCommentFormModal isOpen={showModal} onClose={handleClose} comment={comment} onEdited={getComments} />
        </div>
    )
}