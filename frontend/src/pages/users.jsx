import { useState } from "react";
import UserFormModal from "../components/users/UserFormModal";
import useUsers from "../hooks/useUsers";
import api from "../api/axios";




export default function Users() {

    const { users, getUsers, loading, error, setUsers } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleCreateUser = () => {
        setSelectedUser(null);
        setShowModal(true)

    }
    const handleClose = () => {
        setShowModal(false)
    }

    const handleDelete = async (user) => {
        try {
            console.log(user)
            const userId = user.id;
            await api.patch(`/api/users/deactivate/${userId}`);
            setUsers((prev) => {
                return prev.filter((user) => user.id !== userId)
            })
        }
        catch (error) {
            console.error(error);

        }
    }


    if (loading) {
        return <h1>Loading</h1>
    }
    if (error) {
        return <h1>Error</h1>
    }


    return (
        <div>
            <button className="border" onClick={handleCreateUser}>Create User</button>
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
                        <th className="border px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td className="border  px-4 py-3">{user.id}</td>
                                    <td className="border px-4 py-3">{user.first_name}</td>
                                    <td className="border px-4 py-3">{user.last_name}</td>
                                    <td className="border px-4 py-3">{user.role}</td>
                                    <td className="border px-4 py-3">{user.email}</td>
                                    <td className="border px-4 py-3">{user.phone_number}</td>
                                    <td className="border px-4 py-3">{new Date(user.created_at).toLocaleDateString()} </td>
                                    <td className="border px-4 py-3"><button onClick={() => {
                                        setSelectedUser(user);
                                        setShowModal(true);
                                    }}>Edit</button>
                                        <button onClick={() => {
                                            handleDelete(user);
                                        }}>Deactivate</button>
                                    </td>
                                </tr>

                            );
                        })
                    }


                </tbody>
            </table>

            <UserFormModal isOpen={showModal} onClose={handleClose} onUserCreated={getUsers} selectedUser={selectedUser} />
        </div>
    );
}