import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useAuditTemplates() {

    const [auditTemplates, setAuditTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getAuditTemplates = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/audit-templates');
            setAuditTemplates(result.data);

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
        { loading, error, auditTemplates, getAuditTemplates, setAuditTemplates }
    );

}