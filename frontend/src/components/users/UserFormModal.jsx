import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import api from '../../api/axios'

export default function UserFormModal({ isOpen, onClose, onUserCreated, selectedUser }) {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'ADMIN',
        phone_number: ''

    });

    const isEditing = selectedUser !== null;


    useEffect(() => {
        if (!selectedUser) {

            return setFormData(
                {
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    role: 'ADMIN',
                    phone_number: ''

                }
            )
        }
        else {

            setFormData(
                {
                    first_name: selectedUser.first_name,
                    last_name: selectedUser.last_name,
                    email: selectedUser.email,
                    password: '',
                    role: selectedUser.role,
                    phone_number: selectedUser.phone_number
                }
            );
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
            isEditing ? await api.patch(`/api/users/${selectedUser.id}`, payload) : await api.post('/api/users', payload);
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
        <Modal>
            <form onSubmit={handleSubmit}>
                <label >First Name<input name='first_name' type="text" value={formData.first_name} onChange={handleChange} required /></label>
                <label >Last Name<input name='last_name' type="text" value={formData.last_name} onChange={handleChange} required /></label>
                <label >Email<input name='email' type="text" value={formData.email} onChange={handleChange} required /></label>
                <label >Password<input name='password' type="text" value={formData.password} onChange={handleChange} required={!isEditing} /></label>
                <label >Role
                    <select name='role' value={formData.role} onChange={handleChange} required>
                        {
                            roles.map((role) => {
                                return <option key={role} value={role}>{role}</option>
                            })
                        }
                    </select>

                </label>
                <label >Phone Number<input name='phone_number' type="text" value={formData.phone_number} onChange={handleChange} required /></label>
                <button>{isEditing ? "Update" : "Create"}</button>
            </form>
            <button onClick={onClose}>Close</button>
        </Modal >
    )
}