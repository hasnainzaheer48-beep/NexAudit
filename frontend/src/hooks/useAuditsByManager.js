import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useAuditByManager(managerId) {
    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getAuditsByManager = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/audits/me');
            setAudits(result.data);

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
        { loading, error, audits, getAuditsByManager }
    );




}