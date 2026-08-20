import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useAuditTemplates(page = 1, limit = 10) {

    const [auditTemplates, setAuditTemplates] = useState([]);
    const [pagination, setPagination] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getAuditTemplates = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/audit-templates', {
                params: {
                    page,
                    limit
                }
            });
            setAuditTemplates(result.data.data);
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
        getAuditTemplates();
    }, [])

    return (
        { loading, pagination, error, auditTemplates, getAuditTemplates, setAuditTemplates }
    );

}