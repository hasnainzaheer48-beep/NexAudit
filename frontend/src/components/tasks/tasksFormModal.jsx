import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'

export default function TasksFormModal({ isOpen, onClose, onTaskCreated, selectedTask }) {

    const [formData, setFormData] = useState({
        description: '',
        priority: '',
        order_number: '',


    });



    const isEditing = selectedTask !== null;

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

            isEditing ? await api.patch(`/api/tasks/${selectedTask.id}`, formData) :
                await api.post(`/api/tasks`, formData);

            setFormData({
                title: '',
                description: '',
                priority: '',
                order_number: '',


            });

            onTaskCreated();
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

            });

        }
        else {
            setFormData({
                title: '',
                description: '',
                priority: '',
                order_number: '',


            });

        }
    }, [selectedTask])



    if (!isOpen) return null;
    return (
        <Modal>
            <form onSubmit={handleSubmit} >
                <label>Title<input name="title" type="text" value={formData.title} onChange={handleChange} required /></label>
                <label>Description<input name="description" type="text" value={formData.description} onChange={handleChange} required /></label>
                <label>Priority<input name="priority" type="text" value={formData.priority} onChange={handleChange} required /></label>
                <label>Order Number<input name="order_number" type="text" value={formData.order_number} onChange={handleChange} required /></label>

                <button className="border">{isEditing ? "Update" : "Create"}</button>
            </form>
            <button className="border" onClick={onClose} >Close</button>
        </Modal>
    );
}