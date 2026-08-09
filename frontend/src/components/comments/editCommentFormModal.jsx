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
        try {
            await api.post(`/api/comments/${taskId}/comments`, { content });
            setContent('');
            onCreated();
            onClose();
        }
        catch (error) {
            console.error(error)
        }

    }


    if (!isOpen) return null;
    return (
        <Modal>
            <form onSubmit={handleSubmit} >
                <label>Edit Comment
                    <input type="text" placeholder="Edit Comment" value={content} onChange={handleChange} />
                </label>
                <button className="border">Save Changes</button>
            </form>
            <button onClick={onClose} className="border">Close</button>
        </Modal>
    )
}