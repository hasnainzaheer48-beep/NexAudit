import { useState, useEffect } from "react";
import api from "../api/axios";



export default function useRecentActivity() {
    const [recentActivity, setRecentActivity] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getRecentActivity = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/activity-logs/user`);
            setRecentActivity(result.data);

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
        getRecentActivity();
    }, [])

    return (
        { loading, error, recentActivity, getRecentActivity }
    );




}