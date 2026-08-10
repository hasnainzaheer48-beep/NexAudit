import { useEffect, useState } from "react";
import api from "../api/axios";


const useTasksByManager = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTasksByManager = async () => {


        try {

            setLoading(true);
            const result = await api.get(`/api/tasks/me/manager`);
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
        getTasksByManager();
    }, []);

    return { loading, error, getTasksByManager, tasks }

}

export default useTasksByManager;