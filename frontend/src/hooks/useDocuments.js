import { useState, useEffect } from "react";
import api from "../api/axios";




export default function useDocuments(taskId) {

    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getDocuments = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/tasks/${taskId}/documents`);
            setDocuments(result.data);

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
        getDocuments();
    }, [taskId])

    return (
        { loading, error, documents, getDocuments, setDocuments }
    );

}