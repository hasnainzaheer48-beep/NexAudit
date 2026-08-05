import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


export default function ProtectedRoute() {
    const { token, loading } = useContext(AuthContext);




    if (!token) {
        return <Navigate to="/login" />;
    }

    if (loading)
        return null

    return <Outlet />


}