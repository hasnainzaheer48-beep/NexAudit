import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from "../../api/axios";
import FormField from "../ui/form/formField";
import FormInput from "../ui/form/formInput";
import FormActions from "../ui/form/formActions";



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
        <Modal title="Add Comment" subtitle="Leave a note about this task or audit" onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3" >
                <FormField label={"Comment"}>
                    <FormInput type="text" placeholder="Add Comment" value={content} onChange={handleChange} />
                </FormField>
                <FormActions onClose={onClose} />
            </form>

        </Modal>
    )
}