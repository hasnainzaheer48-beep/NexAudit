import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Navbar() {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-blue-300 flex justify-between px-2 font-semibold">
            <div><h1>HELOOO</h1></div>
            <div>Hello, {user.first_name}</div>

        </div>
    )
}