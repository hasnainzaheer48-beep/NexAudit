import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useTask(taskId) {

    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getTask = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/tasks/${taskId}`);
            setTask(result.data);

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
        getTask();
    }, [])

    return (
        { loading, error, task, getTask }
    );

}