import { createContext, useState, useEffect } from "react";
import api from '../api/axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let [token, setToken] = useState(localStorage.getItem("token"));
    let [user, setUser] = useState({});


    useEffect(() => {
        if (!token)
            return
        const userData = async () => {
            const userData = await api.get('/api/auth/me');
            setUser(userData.data);

        }

        userData();
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AuthContext.Provider>)
        ;

}

export default AuthProvider;