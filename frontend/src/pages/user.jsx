import { useEffect, useState } from "react";
import api from "../api/axios";




export default function Users() {

    const [users, setUsers] = useState([]);

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





    useEffect(() => {
        getUsers();

    }, []);




    return (

        <table className="border border-collapse table-auto">
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

    );
}