import { useState, useEffect } from "react";
import api from "../api/axios";



export default function useOverdue(userRole) {
    const [overdue, setOverdue] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getOverdue = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/dashboard/${userRole}/overdue`);
            setOverdue(result.data);

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
        getOverdue();
    }, [])

    return (
        { loading, error, overdue, getOverdue }
    );




}