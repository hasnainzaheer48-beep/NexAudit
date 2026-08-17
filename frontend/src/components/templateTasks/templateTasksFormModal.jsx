import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'
import FormField from "../ui/form/formField";
import FormInput from "../ui/form/formInput";
import FormActions from "../ui/form/formActions";
import FormSelect from "../ui/form/formSelect";

export default function TemplateTasksFormModal({ isOpen, onClose, onTemplateTaskCreated, selectedTemplateTask, templateId }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: '',
        order_number: '',
        template_id: templateId

    });

    const priorities = ['Low', 'Medium', 'High', 'Critical'];



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
            <form onSubmit={handleSubmit} className="space-y-4 py-3">
                <FormField label={"Title"}><FormInput name="title" type="text" value={formData.title} onChange={handleChange} required /></FormField>
                <FormField label={"Description"}><FormInput name="description" type="text" value={formData.description} onChange={handleChange} required /></FormField>
                <FormField label={"Priority"}>

                    <FormSelect name="priority" type="text" value={formData.priority} onChange={handleChange} required >
                        <option value="">Select Priority</option>
                        {
                            priorities.map((priority) => {
                                return <option key={priority} value={priority}>{priority}</option>
                            })
                        }

                    </FormSelect>

                </FormField>
                <FormField label={"Order Number"}><FormInput name="order_number" type="text" value={formData.order_number} onChange={handleChange} required /></FormField>

                <FormActions submitText={isEditing ? "Update" : "Create"} onClose={onClose} />
            </form>
        </Modal>
    );
}