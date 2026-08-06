import { useContext } from "react"
import { AuthContext } from '../../context/AuthContext'

export default function InfoCard() {
    const { user, loading } = useContext(AuthContext);
    if (loading) return null;
    return (
        <div>
            <div>Name: {user.first_name + " " + user.last_name} </div>
            <div>Email: {user.email} </div>
            <div>Role: {user.role} </div>
            <div>Phone Number: {user.phone_number}</div>
            <div>Created At: {new Date(user.created_at).toLocaleDateString()}</div>
            <div></div>
        </div>
    );
}