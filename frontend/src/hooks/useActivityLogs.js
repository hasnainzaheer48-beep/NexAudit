import { useEffect, useState } from "react";
import api from "../api/axios";



export default function useActivityLogs(page = 1, limit = 10) {
    const [activityLogs, setActivityLogs] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getActivityLogs = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/activity-logs', {
                params: {
                    page,
                    limit
                }
            });
            setActivityLogs(result.data.data);
            setPagination(result.data.pagination)
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
    }, [page, limit]);

    return { activityLogs, pagination, getActivityLogs, error, loading }
}