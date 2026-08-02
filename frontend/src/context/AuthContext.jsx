import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    let [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>)
        ;

}

export default AuthProvider;