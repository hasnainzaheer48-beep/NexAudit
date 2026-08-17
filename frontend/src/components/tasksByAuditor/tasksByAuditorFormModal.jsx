import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import api from "../../api/axios";
import FormField from "../ui/form/formField";
import FormSelect from "../ui/form/formSelect";
import FormActions from "../ui/form/formActions";


export default function TasksByAuditorFormModal({ isOpen, onClose, onTaskUpdated, selectedTask }) {

    const [formData, setFormData] = useState({
        status: ''

    });

    const statuses = ['Draft', 'In Progress', 'Finished'];

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

            await api.patch(`/api/tasks/${selectedTask.id}/status`, formData);


            setFormData({
                status: ''


            });

            onTaskUpdated();
            onClose();
        }
        catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {


        setFormData({

            priority: selectedTask?.status ?? '',



        });



    }, [selectedTask])





    if (!isOpen) return null;
    return (
        <Modal title={"Update Task Status"}
            subtitle={"Change the current status of this task"}
            onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3" >
                <FormField label={"Task Status"}>
                    <FormSelect name="status" value={formData.status} onChange={handleChange}>

                        {
                            statuses.map((status) => {
                                return (
                                    <option value={status} key={status} >{status} </option>
                                )
                            })
                        }
                    </FormSelect>
                </FormField>




                <FormActions submitText="Update Status" onClose={onClose} />
            </form>

        </Modal>
    );
}