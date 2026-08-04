import { useState } from "react";
import CreateUserModal from "../components/users/createUserModal";
import useUsers from "../hooks/useUsers";




export default function Users() {

    const { users, getUsers, loading, error } = useUsers();
    const [showModal, setShowModal] = useState(false);
    const handleCreateUser = () => {
        setShowModal(true)
    }
    const handleClose = () => {
        setShowModal(false)
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
                        <th className="border px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map((user) => {
                            return (<>
                                <tr key={user.id}>
                                    <td className="border  px-4 py-3">{user.id}</td>
                                    <td className="border px-4 py-3">{user.first_name}</td>
                                    <td className="border px-4 py-3">{user.last_name}</td>
                                    <td className="border px-4 py-3">{user.role}</td>
                                    <td className="border px-4 py-3">{user.email}</td>
                                    <td className="border px-4 py-3">{user.phone_number}</td>
                                    <td className="border px-4 py-3">{new Date(user.created_at).toLocaleDateString()} </td>
                                    <td className="border px-4 py-3"><button>Edit</button></td>
                                </tr>
                            </>
                            );
                        })
                    }


                </tbody>
            </table>

        </div>
    );
}