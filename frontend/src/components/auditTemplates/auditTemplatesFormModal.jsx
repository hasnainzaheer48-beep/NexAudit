import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'
import FormField from "../ui/form/formField";
import FormInput from "../ui/form/formInput";
import FormSelect from "../ui/form/formSelect";
import FormActions from "../ui/form/formActions";

export default function AuditTemplatesFormModal({ isOpen, onClose, onAuditTemplateCreated, selectedAuditTemplate }) {

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        audit_type: '',
        version: '',
        is_active: true
    });
    const [originalData, setOriginalData] = useState(null)



    const isEditing = selectedAuditTemplate !== null;

    const handleChange = (event) => {


        let value = event.target.value;

        if (event.target.name === "is_active") {
            value = value === "true";
        }

        const newFormData = {
            ...formData,
            [event.target.name]: value
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
                await api.patch(`/api/audit-templates/${selectedAuditTemplate.id}`, changes)
            }
            else {
                await api.post(`/api/audit-templates`, formData);
            }
            setFormData({
                name: '',
                description: '',
                audit_type: '',
                version: '',
                is_active: true
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

            const auditTemplateData = {
                name: selectedAuditTemplate.name,
                description: selectedAuditTemplate.description,
                audit_type: selectedAuditTemplate.audit_type,
                version: selectedAuditTemplate.version,
                is_active: selectedAuditTemplate.is_active
            }

            setFormData(auditTemplateData);
            setOriginalData(auditTemplateData);

        }
        else {
            setFormData({
                name: '',
                description: '',
                audit_type: '',
                version: '',
                is_active: true
            });
            setOriginalData(null);
        }
    }, [selectedAuditTemplate])



    if (!isOpen) return null;
    return (
        <Modal subtitle={isEditing ? "Update the template and its task structure" : "Define a reusable structure for your audits"}
            title={isEditing ? "Edit Audit Template" : "Create Audit Template"}
            onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3">
                <FormField label={"Name"}><FormInput name="name" type="text" value={formData.name} onChange={handleChange} required /></FormField >
                <FormField label={"Description"} ><FormInput name="description" type="text" value={formData.description} onChange={handleChange} required /></FormField >
                <FormField label={"Audit Type"} ><FormInput name="audit_type" type="text" value={formData.audit_type} onChange={handleChange} required /></FormField >
                <FormField label={"Version"} ><FormInput name="version" type="text" value={formData.version} onChange={handleChange} required /></FormField >
                <FormField label={"Active"} ><FormSelect name="is_active" value={formData.is_active} onChange={handleChange} required>
                    <option key={true} value={true}>TRUE</option>
                    <option key={false} value={false}>FALSE</option>
                </FormSelect></FormField >
                <FormActions onClose={onClose} />
            </form>

        </Modal>
    );
}