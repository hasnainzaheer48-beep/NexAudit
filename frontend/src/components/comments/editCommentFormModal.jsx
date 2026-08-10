import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from "../../api/axios";



export default function EditCommentFormModal({ isOpen, onClose, comment, onEdited }) {

    const [content, setContent] = useState(comment.content);
    const handleChange = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        if (!content.trim()) return;
        try {
            await api.patch(`/api/comments/${comment.id}/edit`, { content });

            onEdited();
            onClose();
        }
        catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        setContent(comment?.content);
    }, [comment]);


    if (!isOpen) return null;
    return (
        <Modal>
            <form onSubmit={handleSubmit} >
                <label>Edit Comment
                    <input type="text" placeholder="Edit Comment" value={content} onChange={handleChange} required />
                </label>
                <button className="border">Save Changes</button>
            </form>
            <button onClick={onClose} className="border">Close</button>
        </Modal>
    )
}