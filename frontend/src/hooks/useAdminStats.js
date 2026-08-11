import { useState, useEffect } from "react";
import api from "../api/axios";



export default function useAdminStats() {
    const [adminUserStats, setAdminStats] = useState({
        total_users: 0,
        total_auditors: 0,
        total_managers: 0,
        active_auditors: 0,
        active_managers: 0
    });
    const [adminClientStats, setAdminClientStats] = useState({
        total_clients: 0
    });
    const [adminAuditStats, setAdminAuditStats] = useState(
        {
            total_audits: 0,
            active_audits: 0
        });

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
        { loading, error, adminUserStats, adminClientStats, adminAuditStats, getStats }
    );




}