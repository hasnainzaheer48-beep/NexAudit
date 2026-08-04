import { useEffect, useState } from "react";
import api from '../api/axios'


export default function Clients() {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getClients = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/clients');
            setClients(result.data);

        }
        catch (error) {
            console.error(error);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getClients();
    }, [])

    return (
        <table>
            <thead>
                <tr>
                    <th className="border px-4 py-3">Id</th>
                    <th className="border px-4 py-3">Company Name</th>
                    <th className="border px-4 py-3">Email</th>
                    <th className="border px-4 py-3">Location</th>
                    <th className="border px-4 py-3">Phone Number</th>
                    <th className="border px-4 py-3">Industry</th>
                    <th className="border px-4 py-3">Created At</th>
                    <th className="border px-4 py-3">Updated At</th>
                </tr>
            </thead>
            <tbody>
                {
                    clients.map((client) => {
                        return (
                            <tr>
                                <td className="border px-4 py-3">{client.id}</td>
                                <td className="border px-4 py-3">{client.company_name}</td>
                                <td className="border px-4 py-3">{client.email}</td>
                                <td className="border px-4 py-3">{client.location}</td>
                                <td className="border px-4 py-3">{client.phone_number}</td>
                                <td className="border px-4 py-3">{client.industry}</td>
                                <td className="border px-4 py-3">{new Date(client.created_at).toLocaleDateString()}</td>
                                <td className="border px-4 py-3">{new Date(client.updated_at).toLocaleDateString()}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>




    );
}