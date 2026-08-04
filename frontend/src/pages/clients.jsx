import { useState } from "react";
import useClients from "../hooks/useClients";



export default function Clients() {

    const { loading, error, clients, getClients } = useClients();

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        return <>{error.message}</>
    }


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
                            <tr key={client.id}>
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