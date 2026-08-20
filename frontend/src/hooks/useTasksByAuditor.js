import { useEffect, useState } from "react";
import api from "../api/axios";


const useTasksByAuditor = (page = 1, limit = 10) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null)
    const [error, setError] = useState(null);

    const getTasksByAuditor = async () => {


        try {

            setLoading(true);
            const result = await api.get(`/api/tasks/me`, {
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
        getTasksByAuditor();
    }, [page, limit]);

    return { loading, pagination, error, getTasksByAuditor, tasks }

}

export default useTasksByAuditor;