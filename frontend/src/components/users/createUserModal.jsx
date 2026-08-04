import { useState } from 'react';
import Modal from '../ui/Modal'

export default function CreateUserModal({ isOpen, onClose }) {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'ADMIN',
        phone_number: ''

    })

    const roles = ["ADMIN", "MANAGER", "AUDITOR"]

    const handleSubmit = (event) => {
        event.preventDefault();
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
                <label >First Name<input name='first_name' type="text" value={formData.first_name} onChange={handleChange} /></label>
                <label >Last Name<input name='last_name' type="text" value={formData.last_name} onChange={handleChange} /></label>
                <label >Email<input name='email' type="text" value={formData.email} onChange={handleChange} /></label>
                <label >Password<input name='password' type="text" value={formData.password} onChange={handleChange} /></label>
                <label >Role
                    <select name='role' value={formData.role} onChange={handleChange}>
                        {
                            roles.map((role) => {
                                return <option key={role} value={role}>{role}</option>
                            })
                        }
                    </select>

                </label>
                <label >Phone Number<input name='phone_number' type="text" value={formData.phone_number} onChange={handleChange} /></label>
                <button>Create User</button>
            </form>
            <button onClick={onClose}>Close</button>
        </Modal >
    )
}