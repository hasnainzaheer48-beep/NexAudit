import { Archive, ArchiveRestore, CheckCircle, Circle, PenBox, PlusCircle, Trash2, UserRoundMinus, UserRoundPen } from "lucide-react"

export default function ActionBadge({ action }) {

    const actions = {
        'Created': "bg-green-100 text-green-700",
        'Updated': "bg-blue-100 text-blue-700",
        'Deleted': "bg-red-100 text-red-700",
        'Assigned Auditor': "bg-emerald-100 text-emerald-700",
        'Status Updated': "bg-indigo-100 text-indigo-700",
        'Completed': "bg-purple-100 text-purple-700",
        'Archived': "bg-red-100 text-red-700",
        'Restored': "bg-emerald-100 text-emerald-700",
        'Deactivated': "bg-red-100 text-red-700"
    }
    const icons = {
        'Created': PlusCircle,
        'Updated': PenBox,
        'Deleted': Trash2,
        'Assigned Auditor': UserRoundPen,
        'Status Updated': Circle,
        'Completed': CheckCircle,
        'Archived': Archive,
        'Restored': ArchiveRestore,
        'Deactivated': UserRoundMinus
    }

    let Icon = icons[action]

    return (
        <div className=
            {` px-3
            py-1
            rounded-full
            text-xs
            font-medium
            whitespace-nowrap
            inline-flex
            gap-1
            ${actions[action]}
            `}
        >
            <div className="flex items-center justify-center"><Icon className=" size-5 stroke-1.3" /></div>
            <div>{action}</div>
        </div>
    )
}