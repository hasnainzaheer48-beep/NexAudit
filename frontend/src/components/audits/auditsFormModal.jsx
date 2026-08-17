import { useEffect, useState } from "react";
import Modal from "../ui/Modal";
import api from '../../api/axios'
import useClients from '../../hooks/useClients'
import useAuditTemplates from '../../hooks/useAuditTemplates';
import FormField from "../ui/form/formField";
import FormSelect from "../ui/form/formSelect";
import FormInput from "../ui/form/formInput";
import FormActions from "../ui/form/formActions";

export default function AuditsFormModal({ isOpen, onClose, onAuditCreated, selectedAudit }) {

    const { clients } = useClients();
    const { auditTemplates } = useAuditTemplates();

    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    const statuses = ['Draft', 'In Progress'];


    const [formData, setFormData] = useState({
        client_id: '',
        template_id: '',
        audit_year: '',
        audit_type: '',
        start_date: '',
        due_date: '',
        priority: '',
        status: '',
        description: '',
        is_archived: false,
        archived_at: ''
    });



    const isEditing = selectedAudit !== null;

    const handleChange = (event) => {


        let value = event.target.value;

        if (event.target.name === "is_archived") {
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

            isEditing ? await api.patch(`/api/audits/${selectedAudit.id}`, formData) :
                await api.post(`/api/audits`, formData);

            setFormData({
                client_id: '',
                template_id: '',
                audit_year: '',
                audit_type: '',
                start_date: '',
                due_date: '',
                priority: '',
                status: '',
                description: '',
                is_archived: false,
                archived_at: ''
            });

            onAuditCreated();
            onClose();
        }
        catch (error) {
            console.error(error);
        }


    }

    useEffect(() => {

        if (isEditing) {
            setFormData({
                client_id: selectedAudit.client_id,
                template_id: selectedAudit.template_id,
                audit_year: selectedAudit.audit_year,
                audit_type: selectedAudit.audit_type,
                start_date: selectedAudit.start_date.split('T')[0],
                due_date: selectedAudit.due_date.split('T')[0],
                priority: selectedAudit.priority,
                status: selectedAudit.status,
                description: selectedAudit.description,
                is_archived: selectedAudit.is_archived,
                archived_at: selectedAudit.archived_at
            });

        }
        else {
            setFormData({
                client_id: '',
                template_id: '',
                audit_year: '',
                audit_type: '',
                start_date: '',
                due_date: '',
                priority: '',
                status: '',
                description: '',
                is_archived: false,
                archived_at: ''
            });

        }
    }, [selectedAudit])



    if (!isOpen) return null;
    return (
        <Modal title={isEditing ? "Edit Audit" : "Create Audit"} subtitle={isEditing ? "Update this audit's details and schedule" : "Set up a new audit for a client"} onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3" >
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-3 ">

                    <FormField label={"Client"} required={true}>

                        <FormSelect name="client_id" type="text" value={formData.client_id} onChange={handleChange} required >
                            <option value="">Select Client</option>
                            {
                                clients.map((client) => {
                                    return <option key={client.id} value={client.id}>{client.company_name}</option>
                                })
                            }

                        </FormSelect>
                    </FormField>
                    <FormField label={"Template"} required={true}>

                        <FormSelect name="template_id" type="text" value={formData.template_id} onChange={handleChange} required >
                            <option value="">Select Template</option>
                            {
                                auditTemplates.map((auditTemplate) => {
                                    return <option key={auditTemplate.id} value={auditTemplate.id}>{auditTemplate.name}</option>
                                })
                            }

                        </FormSelect>
                    </FormField>
                    <FormField label={"Audit Year"} required={true}><FormInput name="audit_year" type="number" value={formData.audit_year} onChange={handleChange} required /></FormField>
                    <FormField label={"Audit Type"} required={true}><FormInput name="audit_type" type="text" value={formData.audit_type} onChange={handleChange} required /></FormField>
                    <FormField label={"Start Date"} required={true}><FormInput name="start_date" type="date" value={formData.start_date} onChange={handleChange} required /></FormField>
                    <FormField label={"Due Date"} required={true}><FormInput name="due_date" type="date" value={formData.due_date} onChange={handleChange} required /></FormField>

                    <FormField label={"Priority"} required={true}>
                        <FormSelect name="priority" type="text" value={formData.priority} onChange={handleChange} required >
                            <option value="">Select Priority</option>
                            {
                                priorities.map((priority) => {
                                    return <option key={priority} value={priority}>{priority}</option>
                                })
                            }

                        </FormSelect>

                    </FormField>

                    {isEditing && <FormField label={"Status"} required={true}>

                        <FormSelect name="status" type="text" value={formData.status} onChange={handleChange} required >
                            <option value="">Select Status</option>
                            {
                                statuses.map((status) => {
                                    return <option key={status} value={status}>{status}</option>
                                })
                            }
                        </FormSelect>
                    </FormField>}
                    <FormField label={"Description"}><FormInput name="description" type="text" value={formData.description} onChange={handleChange} required /></FormField>

                    {isEditing && <FormField label={"Archive"} required={true}><FormSelect name="is_archived" value={formData.is_archived} onChange={handleChange} required>
                        <option key={true} value={true}>TRUE</option>
                        <option key={false} value={false}>FALSE</option>
                    </FormSelect></FormField>}
                </div>
                <FormActions onClose={onClose} />
            </form>
        </Modal>
    );
}