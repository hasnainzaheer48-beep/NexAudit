import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function RoleRoute({ roles }) {
    const { user, loading } = useContext(AuthContext);
    if (!user) {
        return <Navigate to={"/login"} />
    }
    if (loading) {
        return null
    }
    const role = user.role;


    if (!roles.includes(role)) {
        return <Navigate to={"/dashboard"} />
    }

    return <Outlet />


}