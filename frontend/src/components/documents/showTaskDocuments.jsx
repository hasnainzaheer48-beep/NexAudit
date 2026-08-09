import useDocuments from "../../hooks/useDocuments";
import DocumentCard from "./documentCard";

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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {
                documents.map((document) => {
                    return < DocumentCard key={document.id} onDelete={onDelete} document={document} />
                })
            }

        </div>
    )
}