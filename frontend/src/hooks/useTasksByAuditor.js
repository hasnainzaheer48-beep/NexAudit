import { useEffect, useState } from "react";
import api from "../api/axios";


const useTasksByAuditor = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasksByAuditor = async () => {


        try {

            setLoading(true);
            const result = await api.get(`/api/tasks/me`);
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
        getTasksByAuditor();
    }, []);

    return { loading, error, getTasksByAuditor, tasks }

}

export default useTasksByAuditor;