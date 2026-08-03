import { createContext, useState, useEffect } from "react";
import api from '../api/axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let [token, setToken] = useState(localStorage.getItem("token"));
    let [user, setUser] = useState(null);
    let [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!token)
            return setLoading(false);
        const userData = async () => {

            try {

                const userData = await api.get('/api/auth/me');
                setUser(userData.data);

            }

            catch (error) {
                console.error(error);
                localStorage.removeItem("token")
                setToken(null);
                setUser(null);
            }

            finally {
                setLoading(false)
            }

        }

        userData();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, loading }}>
            {children}
        </AuthContext.Provider>)
        ;

}

export default AuthProvider;