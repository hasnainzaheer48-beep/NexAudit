import useDocuments from "../../hooks/useDocuments";
import DocumentCard from "./documentCard";

export default function ShowTaskDocuments({ taskId }) {

    const { documents, loading, error, getDocuments } = useDocuments(taskId);


    if (loading) return null;
    if (error) return console.log(error);

    console.log(documents)

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
            {
                documents.map((document) => {
                    return < DocumentCard document={document} />
                })
            }

        </div>
    )
}