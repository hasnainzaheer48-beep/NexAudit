import { useState, useEffect } from "react";
import api from "../api/axios";



export default function useUpcoming(userRole) {
    const [upcoming, setUpcoming] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUpcoming = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/dashboard/${userRole}/upcoming`);
            setUpcoming(result.data);

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
        getUpcoming();
    }, [])

    return (
        { loading, error, upcoming, getUpcoming }
    );




}