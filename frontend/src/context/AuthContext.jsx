import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let [token, setToken] = useState(localStorage.getItem("token"));
    let [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser }}>
            {children}
        </AuthContext.Provider>)
        ;

}

export default AuthProvider;