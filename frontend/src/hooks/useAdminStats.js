import { useState, useEffect } from "react";
import api from "../api/axios";



export default function useStats() {
    const [adminUserStats, setAdminStats] = useState({});
    const [adminClientStats, setAdminClientStats] = useState({});
    const [adminAuditStats, setAdminAuditStats] = useState({});

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getStats = async () => {
        try {
            setLoading(true);
            const userResult = await api.get(`/api/dashboard/admin/stats`);
            const clientResult = await api.get(`/api/dashboard/admin/clients`);
            const auditResult = await api.get(`/api/dashboard/admin/audits`);
            setAdminStats(userResult.data);
            setAdminClientStats(clientResult.data);
            setAdminAuditStats(auditResult.data);

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
        getStats();
    }, [])

    return (
        { loading, error, adminStats, adminClientStats, adminAuditStats, getStats }
    );




}