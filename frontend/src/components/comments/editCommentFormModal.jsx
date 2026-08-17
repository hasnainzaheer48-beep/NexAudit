import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from "../../api/axios";
import FormField from "../ui/form/formField";
import FormInput from "../ui/form/formInput";
import FormActions from "../ui/form/formActions";



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
        <Modal title="Edit Comment" subtitle="Update your comment" onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3" >
                <FormField label={"Edit Comment"}>
                    <FormInput type="text" placeholder="Edit Comment" value={content} onChange={handleChange} required />
                </FormField>
                <FormActions onClose={onClose} submitText="Save Changes" />
            </form>

        </Modal>
    )
}