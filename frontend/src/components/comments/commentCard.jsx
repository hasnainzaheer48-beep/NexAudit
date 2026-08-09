import { useState } from "react";
import EditCommentFormModal from "./editCommentFormModal";


export default function CommentCard({ comment, onDelete, getComments }) {

    const [showModal, setShowModal] = useState(false);



    const handleEdit = () => {
        setShowModal(true);
    }


    const handleClose = () => {
        setShowModal(false);
    }





    return (
        <div className="bg-gray-200 shadow-lg flex p-2 rounded-lg">
            <div id="Content" className="flex-1 flex flex-col pt-0">
                <div id="Commenter Info" className="font-light text-sm">
                    {comment.user} • {comment.role.toLowerCase()} • {new Date(comment.created_at).toLocaleString()}
                </div>
                <div id="Comment" className="flex-1 p-2 bg-white text-sm ">
                    {comment.content}
                </div>
            </div>

            <div id="Action Buttons" className="flex flex-col gap-2 p-1">
                <button className="border p-1 px-6" onClick={handleEdit}>Edit</button>
                <button className="border p-1">Delete</button>
            </div>
            <EditCommentFormModal isOpen={showModal} onClose={handleClose} comment={comment} onEdited={getComments} />
        </div>
    )
}