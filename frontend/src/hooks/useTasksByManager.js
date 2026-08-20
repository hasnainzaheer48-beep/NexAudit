import { useEffect, useState } from "react";
import api from "../api/axios";


const useTasksByManager = (page = 1, limit = 10) => {
    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasksByManager = async () => {


        try {

            setLoading(true);
            const result = await api.get(`/api/tasks/me/manager`, {
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
        getTasksByManager();
    }, [page, limit]);

    return { loading, pagination, error, getTasksByManager, tasks }

}

export default useTasksByManager;