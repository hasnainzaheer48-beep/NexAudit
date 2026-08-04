import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useClients() {

    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getClients = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/clients');
            setClients(result.data);

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
        { loading, error, clients, getClients }
    );

}