import { useContext, useState } from "react";
import useClients from "../hooks/useClients";
import ClientsFormModal from "../components/clients/clientsFormModal";
import { AuthContext } from "../context/AuthContext";
import PageTitle from "../components/ui/pageTitle";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import TableCell from "../components/ui/table/tableCell";
import EmptyTable from "../components/ui/table/emptyTable";
import LoadingComponent from "../components/ui/loadingComponent";
import Button from "../components/ui/button";



export default function Clients() {

    const { loading, error, clients, getClients } = useClients();
    const [showModal, setShowModal] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null);
    const { user } = useContext(AuthContext);

    const handleCreateClient = () => {
        setShowModal(true);
        setSelectedClient(null);
    }

    const handleClose = () => {
        setShowModal(false);
    }

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <>{error.message}</>
    }


    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <PageTitle title={"Clients"} subtitle="Manage your clients and View information." />
                <Button onClick={handleCreateClient}>Create Client</Button>
            </div>
            <div className="flex-1 min-h-0">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Company Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Industry</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            {user.role === "ADMIN" && <TableHead>Action</TableHead>}
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {clients.length === 0 ? <EmptyTable /> :
                            clients.map((client) => {
                                return (
                                    <TableRow key={client.id}>
                                        <TableCell>{client.id}</TableCell>
                                        <TableCell>{client.company_name}</TableCell>
                                        <TableCell>{client.email}</TableCell>
                                        <TableCell>{client.location}</TableCell>
                                        <TableCell>{client.phone_number}</TableCell>
                                        <TableCell>{client.industry}</TableCell>
                                        <TableCell>{new Date(client.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(client.updated_at).toLocaleDateString()}</TableCell>
                                        {user.role === "ADMIN" && <TableCell><button onClick={() => {
                                            setSelectedClient(client);
                                            setShowModal(true);
                                        }}>Edit</button>
                                        </TableCell>}
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <ClientsFormModal isOpen={showModal} selectedClient={selectedClient} onClose={handleClose} onClientCreated={getClients} />
            </div>
        </div>




    );
}