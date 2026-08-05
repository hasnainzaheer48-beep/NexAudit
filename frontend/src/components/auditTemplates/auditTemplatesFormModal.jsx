import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'

export default function AuditTemplatesFormModal({ isOpen, onClose, onAuditTemplateCreated, selectedAuditTemplate }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        audit_type: '',
        version: '',
        is_active: ''
    });

    const isEditing = selectedAuditTemplate !== null;

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

            isEditing ? await api.patch(`api/audit-templates/${selectedAuditTemplate.id}`, formData) :
                await api.post(`api/audit-templates`, formData);

            setFormData({
                name: '',
                description: '',
                audit_type: '',
                version: '',
                is_active: ''
            });

            onAuditTemplateCreated();
            onClose();
        }
        catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {

        if (isEditing) {
            setFormData({
                name: selectedClient.name,
                description: selectedClient.description,
                audit_type: selectedClient.audit_type,
                version: selectedClient.version,
                is_active: selectedClient.is_active
            });

        }
        else {
            setFormData({
                name: '',
                description: '',
                audit_type: '',
                version: '',
                is_active: ''
            });

        }
    }, [selectedAuditTemplate])



    if (!isOpen) return null;
    return (
        <Modal>
            <form onSubmit={handleSubmit} >
                <label>Name<input name="name" type="text" value={formData.name} onChange={handleChange} required /></label>
                <label>Description<input name="description" type="text" value={formData.description} onChange={handleChange} required /></label>
                <label>Audit Type<input name="audit_type" type="text" value={formData.audit_type} onChange={handleChange} required /></label>
                <label>Version<input name="version" type="text" value={formData.version} onChange={handleChange} required /></label>
                <label>Active<input name="is_active" type="text" value={formData.is_active} onChange={handleChange} required /></label>
                <button className="border">{isEditing ? "Update" : "Create"}</button>
            </form>
            <button className="border" onClick={onClose} >Close</button>
        </Modal>
    );
}