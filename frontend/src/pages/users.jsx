import { useEffect, useState } from "react";
import api from "../api/axios";
import CreateUserModal from "../components/users/createUserModal";




export default function Users() {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const getUsers = async () => {
        try {

            const result = await api.get('/api/users');
            setUsers(result.data)
            console.log(result.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleCreateUser = () => {
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
    }





    useEffect(() => {
        getUsers();

    }, []);




    return (
        <div>
            <button className="border" onClick={handleCreateUser}>Create User</button>
            <CreateUserModal isOpen={showModal} onClose={handleClose} onUserCreated={getUsers} />
            <table className="border border-collapse table-auto mt-3">
                <thead>

                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">First Name</th>
                        <th className="border px-4 py-3">Last Name</th>
                        <th className="border px-4 py-3">Role</th>
                        <th className="border px-4 py-3">Email</th>
                        <th className="border px-4 py-3">Phone</th>
                        <th className="border px-4 py-3">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user) => {
                            return (<tr key={user.id}>
                                <td className="border  px-4 py-3">{user.id}</td>
                                <td className="border px-4 py-3">{user.first_name}</td>
                                <td className="border px-4 py-3">{user.last_name}</td>
                                <td className="border px-4 py-3">{user.role}</td>
                                <td className="border px-4 py-3">{user.email}</td>
                                <td className="border px-4 py-3">{user.phone_number}</td>
                                <td className="border px-4 py-3">{new Date(user.created_at).toLocaleDateString()} </td>
                            </tr>);
                        })
                    }

                </tbody>
            </table>

        </div>
    );
}