import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useTemplateTasks(templateId) {

    const [templateTasks, setTemplateTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getTemplateTasks = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/template-tasks/template/${templateId}`);
            setTemplateTasks(result.data);

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
        getTemplateTasks();
    }, [])

    return (
        { loading, error, templateTasks, getTemplateTasks }
    );

}