import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useTasks() {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getTasks = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/tasks`);
            setTasks(result.data);

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
    }, [])

    return (
        { loading, error, tasks, getTasks }
    );

}