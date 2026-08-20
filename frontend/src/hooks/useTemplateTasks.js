import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useTemplateTasks(templateId, page = 1, limit = 10) {


    const [templateTasks, setTemplateTasks] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getTemplateTasks = async () => {
        try {
            setLoading(true);
            const result = await api.get(`/api/template-tasks/template/${templateId}`, {
                params: {
                    page,
                    limit
                }
            });
            setTemplateTasks(result.data.data);
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
        getTemplateTasks();
    }, [page, limit])

    return (
        { loading, error, pagination, templateTasks, getTemplateTasks, setTemplateTasks }
    );

}