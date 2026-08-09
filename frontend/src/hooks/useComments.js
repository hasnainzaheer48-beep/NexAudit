import { useState, useEffect } from "react";
import api from "../api/axios";




export default function useComements(taskId) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getComments = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/tasks/${taskId}/comments`);
            setComments(result.data);

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
        getComments();
    }, [taskId])

    return (
        { loading, error, documents, getComments, setComments }
    );

}