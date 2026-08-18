import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'
import FormField from "../ui/form/formField";
import FormActions from "../ui/form/formActions";
import FormInput from "../ui/form/formInput";

export default function ClientsFormModal({ isOpen, onClose, onClientCreated, selectedClient }) {

    const [formData, setFormData] = useState({
        company_name: '',
        email: '',
        location: '',
        phone_number: '',
        industry: ''
    });
    const [originalData, setOriginalData] = useState(null)

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

            if (isEditing) {
                const changes = {}
                for (const key of Object.keys(formData)) {
                    if (originalData[key] !== formData[key]) {
                        changes[key] = formData[key]
                    }
                }
                await api.patch(`api/clients/${selectedClient.id}`, changes)
            }
            else {
                await api.post(`api/clients`, formData);
            }

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
            const clientData = {
                company_name: selectedClient.company_name,
                email: selectedClient.email,
                location: selectedClient.location,
                phone_number: selectedClient.phone_number,
                industry: selectedClient.industry
            }

            setFormData(clientData);
            setOriginalData(clientData);

        }
        else {
            setFormData({
                company_name: '',
                email: '',
                location: '',
                phone_number: '',
                industry: ''
            });
            setOriginalData(null)
        }
    }, [selectedClient])



    if (!isOpen) return null;
    return (
        <Modal title={isEditing ? "Edit Client" : "Create Audit"} subtitle={isEditing ? "Update this client's information" : "Add a new client to your organization"} onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3" >
                <FormField label={"Company Name"}><FormInput name="company_name" type="text" value={formData.company_name} onChange={handleChange} required /></FormField>
                <FormField label={"Email"}><FormInput name="email" type="text" value={formData.email} onChange={handleChange} required /></FormField>
                <FormField label={"Location"}><FormInput name="location" type="text" value={formData.location} onChange={handleChange} required /></FormField>
                <FormField label={"Phone Number"}><FormInput name="phone_number" type="text" value={formData.phone_number} onChange={handleChange} required /></FormField>
                <FormField label={"Industry"}><FormInput name="industry" type="text" value={formData.industry} onChange={handleChange} required /></FormField>
                <FormActions onClose={onClose} />
            </form>
        </Modal>
    );
}