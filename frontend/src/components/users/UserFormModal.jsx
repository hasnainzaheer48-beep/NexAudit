import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../api/axios'
import FormField from '../ui/form/formField';
import FormInput from '../ui/form/formInput';
import FormSelect from '../ui/form/formSelect';
import FormActions from '../ui/form/formActions';

export default function UserFormModal({ isOpen, onClose, onUserCreated, selectedUser }) {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'ADMIN',
        phone_number: ''

    });

    const [originalData, setOriginalData] = useState(null)

    const isEditing = selectedUser !== null;


    useEffect(() => {
        if (!selectedUser) {


            setFormData(
                {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    role: 'ADMIN',
                    phone_number: ''

                })

            setOriginalData(null);

        }
        else {

            const userData = {
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                email: selectedUser.email,
                password: '',
                role: selectedUser.role,
                phone_number: selectedUser.phone_number
            }
            setFormData(userData);
            setOriginalData(userData)
            console.log(selectedUser);

        }

    }, [selectedUser])

    const roles = ["ADMIN", "MANAGER", "AUDITOR"]

    const payload = { ...formData };
    if (isEditing && payload.password === '') {
        delete payload.password;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formData)
        try {
            if (isEditing) {
                const changes = {}
                for (const key of Object.keys(payload)) {
                    if (originalData[key] !== payload[key]) {
                        changes[key] = payload[key]
                    }
                }
                await api.patch(`/api/users/${selectedUser.id}`, changes)
            }
            else {
                await api.post('/api/users', payload);
            }
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                role: 'ADMIN',
                phone_number: ''
            });
            onUserCreated();
            onClose();
        }
        catch (error) {
            console.error(error);
        }



    }

    const handleChange = (event) => {

        const newFormData = {
            ...formData,
            [event.target.name]: event.target.value
        };

        setFormData(newFormData);

    }




    if (!isOpen) return null;


    return (
        <Modal title={isEditing ? "Edit User" : "Create User"} subtitle={isEditing ? "Update this user's details and role" : "Set up a new user for a organization"} onClose={onClose} size="xl">
            <form onSubmit={handleSubmit} className="space-y-4 py-3">
                <FormField label={"First Name"}><FormInput name='first_name' type="text" value={formData.first_name} onChange={handleChange} required /></FormField>
                <FormField label={"Last Name"}><FormInput name='last_name' type="text" value={formData.last_name} onChange={handleChange} required /></FormField>
                <FormField label={"Email"}><FormInput name='email' type="text" value={formData.email} onChange={handleChange} required /></FormField>
                <FormField label={"Password"}><FormInput name='password' type="text" value={formData.password} onChange={handleChange} required={!isEditing} /></FormField>
                <FormField label={"Role"}>
                    <FormSelect name='role' value={formData.role} onChange={handleChange} required>
                        {
                            roles.map((role) => {
                                return <option key={role} value={role}>{role}</option>
                            })
                        }
                    </FormSelect>

                </FormField>
                <FormField label={"Phone Number"}><FormInput name='phone_number' type="text" value={formData.phone_number} onChange={handleChange} required /></FormField>
                <FormActions onClose={onClose} submitText={isEditing ? "Update" : "Create"} />
            </form >

        </Modal >
    )
}