import { useState, useEffect } from "react";
import api from '../api/axios'

export default function useUsers(page = 1, limit = 10) {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getUsers = async () => {
        try {
            setLoading(true)
            const result = await api.get('/api/users', {
                params: {
                    page,
                    limit
                }
            });
            setUsers(result.data.data)
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
        getUsers();

    }, [page, limit]);

    return ({ users, pagination, getUsers, loading, error, setUsers })


}