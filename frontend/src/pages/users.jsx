import { useState } from "react";
import UserFormModal from "../components/users/UserFormModal";
import useUsers from "../hooks/useUsers";
import api from "../api/axios";
import LoadingComponent from "../components/ui/loadingComponent";
import PageTitle from "../components/ui/pageTitle";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import TableCell from "../components/ui/table/tableCell";
import EmptyTable from "../components/ui/table/emptyTable";
import Button from "../components/ui/button";




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
        return <LoadingComponent />
    }
    if (error) {
        return <h1>Error</h1>
    }


    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <PageTitle title={'Users'} subtitle="Manage users, roles, and access across your organization." />
                <Button size="Large" onClick={handleCreateUser}>Create User</Button>
            </div>
            <div className="flex-1 min-h-0 ">

                <Table >
                    <TableHeader>

                        <TableRow>
                            <TableHead >Id</TableHead>
                            <TableHead >First Name</TableHead>
                            <TableHead >Last Name</TableHead>
                            <TableHead >Role</TableHead>
                            <TableHead >Email</TableHead>
                            <TableHead >Phone</TableHead>
                            <TableHead >Created At</TableHead>
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {users.length === 0 ? <EmptyTable message={'No Users'} /> :
                            users?.map((user) => {
                                return (
                                    <TableRow key={user.id}>
                                        <TableCell className="border  px-4 py-3">{user.id}</TableCell>
                                        <TableCell >{user.first_name}</TableCell>
                                        <TableCell >{user.last_name}</TableCell>
                                        <TableCell >{user.role}</TableCell>
                                        <TableCell >{user.email}</TableCell>
                                        <TableCell >{user.phone_number}</TableCell>
                                        <TableCell >{new Date(user.created_at).toLocaleDateString()} </TableCell>
                                        <TableCell ><Button icon="Edit" variant="Edit" iconSize="Small" onClick={() => {
                                            setSelectedUser(user);
                                            setShowModal(true);
                                        }}>Edit</Button >
                                            <button onClick={() => {
                                                handleDelete(user);
                                            }}>Deactivate</button>
                                        </TableCell>
                                    </TableRow>

                                );
                            })
                        }


                    </tbody>
                </Table>

                <UserFormModal isOpen={showModal} onClose={handleClose} onUserCreated={getUsers} selectedUser={selectedUser} />
            </div>
        </div>
    );
}