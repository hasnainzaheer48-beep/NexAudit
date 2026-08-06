import { useEffect, useState } from "react";
import api from "../api/axios";



export default function useActivityLogs() {
    const [activityLogs, setActivityLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getActivityLogs = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/activity-logs');
            setActivityLogs(result.data);
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
        getActivityLogs();
    }, []);

    return { activityLogs, getActivityLogs, error, loading }
}