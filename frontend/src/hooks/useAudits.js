import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useAudits(page = 1, limit = 10) {

    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null)
    const [error, setError] = useState(null)

    const getAudits = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/audits', {
                params: {
                    page,
                    limit
                }
            });
            setAudits(result.data.data);
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
        getAudits();
    }, [page, limit])

    return (
        { loading, error, pagination, audits, getAudits, setAudits }
    );

}