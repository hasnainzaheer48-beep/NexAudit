import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'

export default function TemplateTasksFormModal({ isOpen, onClose, onTemplateTaskCreated, selectedTemplateTask, templateId }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '',
        order_number: '',
        template_id: templateId

    });



    const isEditing = selectedTemplateTask !== null;

    const handleChange = (event) => {


        let value = event.target.value;

        const newFormData = {
            ...formData,
            [event.target.name]: value
        }
        setFormData(newFormData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            isEditing ? await api.patch(`/api/template-tasks/${selectedTemplateTask.id}`, formData) :
                await api.post(`/api/template-tasks`, formData);

            setFormData({
                title: '',
                description: '',
                priority: '',
                order_number: '',
                template_id: templateId

            });

            onTemplateTaskCreated();
            onClose();
        }
        catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {

        if (isEditing) {
            setFormData({
                title: selectedTemplateTask.title,
                description: selectedTemplateTask.description,
                priority: selectedTemplateTask.priority,
                order_number: selectedTemplateTask.order_number,
                template_id: templateId
            });

        }
        else {
            setFormData({
                title: '',
                description: '',
                priority: '',
                order_number: '',
                template_id: templateId

            });

        }
    }, [selectedTemplateTask, templateId])



    if (!isOpen) return null;
    return (
        <Modal title={isEditing ? "Edit Template Task" : "Add Template Task"}
            subtitle={isEditing ? "Update this template task's details" : "Add a task to this audit template"}
            onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} >
                <label>Title<input name="title" type="text" value={formData.title} onChange={handleChange} required /></label>
                <label>Description<input name="description" type="text" value={formData.description} onChange={handleChange} required /></label>
                <label>Priority<input name="priority" type="text" value={formData.priority} onChange={handleChange} required /></label>
                <label>Order Number<input name="order_number" type="text" value={formData.order_number} onChange={handleChange} required /></label>

                <button className="border">{isEditing ? "Update" : "Create"}</button>
            </form>
        </Modal>
    );
}