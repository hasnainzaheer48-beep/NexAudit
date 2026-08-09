import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from "../../api/axios";



export default function CreateCommentFormModal({ isOpen, onClose, taskId, onCreated }) {

    const [content, setContent] = useState('');
    const handleChange = (event) => {
        setContent(event.target.value);
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
            await api.post(`/api/tasks/${taskId}/comments`, { content });
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
                <label>Comment
                    <input type="text" placeholder="Add Comment" value={content} onChange={handleChange} />
                </label>
                <button className="border">Submit</button>
            </form>
            <button onClick={onClose} className="border">Close</button>
        </Modal>
    )
}