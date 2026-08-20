import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useAuditByManager(page = 1, limit = 10) {
    const [audits, setAudits] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getAuditsByManager = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/audits/me', {
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
        getAuditsByManager();
    }, [])

    return (
        { loading, error, audits, pagination, getAuditsByManager, setAudits }
    );




}