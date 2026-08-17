import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'
import useUsers from '../../hooks/useUsers';
import FormField from "../ui/form/formField";
import FormInput from "../ui/form/formInput";
import FormSelect from "../ui/form/formSelect";
import FormActions from "../ui/form/formActions";

export default function TasksFormModal({ isOpen, onClose, onTaskCreated, selectedTask }) {

    const [formData, setFormData] = useState({
        description: '',
        assigned_auditor_id: '',
        priority: '',
        start_date: '',
        due_date: '',

    });
    const { users } = useUsers();
    const priorities = ['Low', 'Medium', 'High', 'Critical'];

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

        const payload = {
            ...formData,
            assigned_auditor_id: formData.assigned_auditor_id === '' ? null : Number(formData.assigned_auditor_id)
        }

        try {

            await api.patch(`/api/tasks/${selectedTask.id}`, payload);


            setFormData({
                description: '',
                assigned_auditor_id: '',
                priority: '',
                start_date: '',
                due_date: '',


            });

            onClose();
            onTaskCreated();
        }
        catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {


        setFormData({
            description: selectedTask?.description ?? '',
            assigned_auditor_id: selectedTask?.assigned_auditor_id ?? '',
            priority: selectedTask?.priority ?? '',
            start_date: selectedTask?.start_date ? selectedTask.start_date.split('T')[0] : '',
            due_date: selectedTask?.due_date ? selectedTask.due_date.split('T')[0] : ''



        });



    }, [selectedTask])



    if (!isOpen) return null;
    return (
        <Modal title={"Edit Task"}
            subtitle={"Update this task's details and deadline"}
            onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3">

                <FormField label={"Description"}><FormInput name="description" type="text" value={formData.description} onChange={handleChange} required /></FormField>
                <FormField label={"Assigned Auditor"}>
                    <FormSelect name="assigned_auditor_id" value={formData.assigned_auditor_id} onChange={handleChange}>
                        <option value="">Not Assigned</option>
                        {
                            users.filter(user => user.role === "AUDITOR").map((user) => {

                                return <option value={user.id} key={user.id}>{user.first_name + " " + user.last_name}</option>

                            })
                        }
                    </FormSelect>
                </FormField>
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
                <FormField label={"Start Date"}><FormInput name="start_date" type="date" value={formData.start_date} onChange={handleChange} required /></FormField>
                <FormField label={"Due Date"}><FormInput name="due_date" type="date" value={formData.due_date} onChange={handleChange} required /></FormField>



                <FormActions onClose={onClose} submitText="Update" />
            </form>

        </Modal>
    );
}





{/* <FormField>
    <select name="assigned_auditor_id" value={formData.assigned_auditor_id} onChange={handleChange}>
    </select>
</FormField> */}