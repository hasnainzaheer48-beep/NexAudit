export default function EntityTypeBadge({ type }) {

    const entities = {
        'User': "bg-orange-100 text-orange-700",
        'Client': "bg-blue-100 text-blue-700",
        'Audit Template': "bg-emerald-100 text-emerald-700",
        'Template Task': "bg-indigo-100 text-indigo-700",
        'Audit': "bg-green-100 text-green-700",
        'Task': "bg-purple-100 text-purple-700"
    }

    return (
        <span className=
            {` px-3
            py-1
            rounded-full
            text-xs
            font-medium
            whitespace-nowrap
            ${entities[type]}
            `}
        >
            {type}
        </span>
    )
}