import { useState, useEffect } from "react";
import api from "../api/axios";



export default function useStats(userRole) {
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getStats = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/dashboard/${userRole}/stats`);
            setStats(result.data);

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
        getStats();
    }, [])

    return (
        { loading, error, stats, getStats }
    );




}