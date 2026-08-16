export default function RoleBadge({ role }) {
    const roles = {
        "auditor": "bg-blue-100 text-blue-700",
        "manager": " bg-green-100 text-[#174d38]",
        "admin": "bg-purple-100 text-purple-700"
    }

    return (
        <div className=
            {` px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ${roles[role]}
            `}
        >
            {role}
        </div>
    )
}