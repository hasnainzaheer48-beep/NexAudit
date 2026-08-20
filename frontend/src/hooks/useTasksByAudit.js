import { useEffect, useState } from "react";
import api from "../api/axios";


export default function useTasksByAudit(auditId, page = 1, limit = 10) {

    const [tasks, setTasks] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasksByAudit = async () => {

        try {
            setLoading(true);
            const result = await api.get(`api/tasks/audit/${auditId}`, {
                params: {
                    page,
                    limit
                }
            });
            setTasks(result.data.data)
            setPagination(result.data.pagination)

        }
        catch (error) {
            setError(error.message);
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTasksByAudit();
    }, [page, limit]);


    return { tasks, getTasksByAudit, pagination };

}