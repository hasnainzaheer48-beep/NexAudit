import useDocuments from "../../hooks/useDocuments";
import DocumentCard from "./documentRow";
import Table from '../ui/table/table'
import TableHeader from "../ui/table/tableHeader";
import TableRow from "../ui/table/tableRow";
import TableHead from "../ui/table/tableHead";
import TableCell from "../ui/table/tableCell";
import DocumentRow from "./documentRow";
import EmptyTable from "../ui/table/emptyTable";

export default function ShowTaskDocuments({ taskId }) {

    const { documents, loading, error, getDocuments, setDocuments } = useDocuments(taskId);


    if (loading) return null;
    if (error) return console.log(error);

    const onDelete = (docId) => {
        setDocuments((prev) => {
            return prev.filter((doc) => doc.id !== docId)
        });
    }

    console.log(documents)

    return (
        <Table >
            <TableHeader>
                <TableRow>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Uploaded At</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <tbody>
                {documents.length === 0 ? <EmptyTable message="No Documents Uploaded Yet" /> :
                    documents.map((document) => {
                        return (
                            <DocumentRow key={document.id} onDelete={onDelete} document={document} />
                        )
                    })
                }
            </tbody>
        </Table>
    )
}