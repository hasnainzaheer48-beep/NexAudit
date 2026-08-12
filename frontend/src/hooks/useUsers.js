import { useState, useEffect } from "react";
import api from '../api/axios'

export default function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getUsers = async () => {
        try {
            setLoading(true)
            const result = await api.get('/api/users');
            setUsers(result.data)
            console.log(result.data);
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
        getUsers();

    }, []);

    return ({ users, getUsers, loading, error, setUsers })


}