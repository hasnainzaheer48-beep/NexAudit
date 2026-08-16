import { useContext, useState } from "react";
import EditCommentFormModal from "./editCommentFormModal";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import { CircleUserRound } from "lucide-react";
import RoleBadge from "../ui/roleBadge";
import Button from "../ui/button";


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
        <div className="flex p-2 gap-2 border-b border-[#cbcbcb] last:border-b-0 ">
            <div id="Content" className="flex-1 flex ">
                <div className="size-14 flex items-center justify-center text-[#174d38]"><CircleUserRound className="size-8" /> </div>
                <div className="flex-1 flex justify-between">
                    <div id="Commenter Info" className="flex flex-col justify-between gap-1">
                        <div className="flex items-center gap-1">
                            <div className="text-sm font-bold">{comment.user}</div>
                            <div><RoleBadge role={comment.role.toLowerCase()} /></div>
                        </div>
                        <div id="Comment" className="flex-1 text-sm text-gray-800 font-medium ">{comment.content}</div>
                    </div>
                    <div className="flex items-center text-sm font-medium text-gray-500">{new Date(comment.created_at).toLocaleString()}</div>
                </div>
            </div>

            {
                user.id === comment.user_id && <div id="Action Buttons" className="flex items-center gap-2">
                    <Button icon="Edit" variant="Edit" isChildren={false} iconSize="Small" onClick={handleEdit}>Edit</Button>
                    <Button icon="Delete" variant="Archive/Deactivate" isChildren={false} iconSize="Small" onClick={handleEdit} onClick={handleDelete} >Delete</Button>
                </div>
            }

            <EditCommentFormModal isOpen={showModal} onClose={handleClose} comment={comment} onEdited={getComments} />
        </div>
    )
}