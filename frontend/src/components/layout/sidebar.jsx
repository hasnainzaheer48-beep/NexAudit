import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside>
            <h3>MENU</h3>
            <Link to='/dashboard'>Dashboard</Link>
        </aside>
    )
}