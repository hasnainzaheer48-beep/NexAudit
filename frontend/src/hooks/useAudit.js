import { useEffect, useState } from "react";
import api from "../api/axios";

export default function useAudit(auditId) {

    const [audit, setAudit] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAudit = async () => {

        try {
            setLoading(true);
            const result = await api.get(`api/audits/${auditId}`);
            setAudit(result.data)
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
        getAudit();
    }, []);


    return { audit, loading, error, getAudit };

}