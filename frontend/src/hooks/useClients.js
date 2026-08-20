import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useClients(page = 1, limit = 10) {

    const [clients, setClients] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getClients = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/clients', {
                params: {
                    page,
                    limit
                }
            });
            setClients(result.data.data);
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
        getClients();
    }, [])

    return (
        { loading, pagination, error, clients, getClients }
    );

}