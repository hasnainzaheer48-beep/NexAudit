import { useEffect, useState } from "react";
import api from "../api/axios";


export default function useTasksByAudit(auditId) {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasksByAudit = async () => {

        try {
            setLoading(true);
            const result = await api.get(`api/tasks/audit/${auditId}`);
            setTasks(result.data)
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
    }, []);


    return { tasks, getTasksByAudit };

}