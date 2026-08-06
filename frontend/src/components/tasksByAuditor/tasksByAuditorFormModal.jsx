import { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import api from "../../api/axios";


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
        <Modal>
            <form onSubmit={handleSubmit} >
                <label>Task Status
                    <select name="status" value={formData.status} onChange={handleChange}>

                        {
                            statuses.map((status) => {
                                return (
                                    <option value={status} key={status} >{status} </option>
                                )
                            })
                        }
                    </select>
                </label>




                <button className="border">Update Status</button>
            </form>
            <button className="border" onClick={onClose} >Close</button>
        </Modal>
    );
}