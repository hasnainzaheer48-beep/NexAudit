import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export default function RoleRoute({ roles }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return null
    }
    const role = user.role;


    if (!roles.includes(role)) {
        return <Navigate to={"/dashboard"} />
    }

    return <Outlet />


}