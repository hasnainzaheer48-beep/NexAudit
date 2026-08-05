import api from '../api/axios'
import { useState, useEffect } from 'react';

export default function useAudits() {

    const [audits, setAudits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const getAudits = async () => {
        try {
            setLoading(true);
            const result = await api.get('/api/audits');
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
        getAudits();
    }, [])

    return (
        { loading, error, audits, getAudits }
    );

}