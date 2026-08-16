import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'

export default function ClientsFormModal({ isOpen, onClose, onClientCreated, selectedClient }) {

    const [formData, setFormData] = useState({
        company_name: '',
        email: '',
        location: '',
        phone_number: '',
        industry: ''
    });

    const isEditing = selectedClient !== null;

    const handleChange = (event) => {

        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        }
        setFormData(newFormData);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            isEditing ? await api.patch(`api/clients/${selectedClient.id}`, formData) :
                await api.post(`api/clients`, formData);

            setFormData({
                company_name: '',
                email: '',
                location: '',
                phone_number: '',
                industry: ''
            });

            onClientCreated();
            onClose();
        }
        catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {

        if (isEditing) {
            setFormData({
                company_name: selectedClient.company_name,
                email: selectedClient.email,
                location: selectedClient.location,
                phone_number: selectedClient.phone_number,
                industry: selectedClient.industry
            });

        }
        else {
            setFormData({
                company_name: '',
                email: '',
                location: '',
                phone_number: '',
                industry: ''
            });

        }
    }, [selectedClient])



    if (!isOpen) return null;
    return (
        <Modal title={isEditing ? "Edit Client" : "Create Audit"} subtitle={isEditing ? "Update this client's information" : "Add a new client to your organization"} onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} >
                <label>Company Name<input name="company_name" type="text" value={formData.company_name} onChange={handleChange} required /></label>
                <label>Email<input name="email" type="text" value={formData.email} onChange={handleChange} required /></label>
                <label>Location<input name="location" type="text" value={formData.location} onChange={handleChange} required /></label>
                <label>Phone Number<input name="phone_number" type="text" value={formData.phone_number} onChange={handleChange} required /></label>
                <label>Industry<input name="industry" type="text" value={formData.industry} onChange={handleChange} required /></label>
                <button className="border">{isEditing ? "Update" : "Create"}</button>
            </form>
        </Modal>
    );
}