import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useAuditProgress(auditId) {
    const [auditProgress, setAuditProgress] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAuditprogress = async () => {

        try {
            setLoading(true);
            const result = await api.get(`api/audits/${auditId}/progress`);
            setAuditProgress(result.data)
        }
        catch (error) {
            setError(error.message);
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAuditprogress();
    }, []);

    return { auditProgress, getAuditprogress, loading, error }


}