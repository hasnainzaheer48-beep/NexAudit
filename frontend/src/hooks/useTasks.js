import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useTasks(page = 1, limit = 10) {

    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getTasks = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/tasks`, {
                params: {
                    page,
                    limit
                }
            });
            setTasks(result.data.data);
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
        getTasks();
    }, [page, limit])

    return (
        { loading, error, pagination, tasks, getTasks }
    );

}