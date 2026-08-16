export default function DocTypeBadge({ type }) {
    const types = {
        "application/pdf": " text-red-700 bg-red-100",
        "application/msword": " bg-blue-100 text-blue-700",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": " bg-blue-100 text-blue-700",
        "text/plain": " bg-gray-100 text-gray-700",
        "application/vnd.ms-excel": "bg-green-100 text-green-700",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "bg-green-100 text-green-700",
        "text/csv": " bg-emerald-100 text-emerald-700"
    }

    const labels = {
        "application/pdf": "PDF",
        "application/msword": "DOC",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
        "text/plain": "TXT",
        "application/vnd.ms-excel": "XLS",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "XLSX",
        "text/csv": "CSV"
    }

    return (
        <span className=
            {` px-3
            py-1
            rounded-full
            text-xs
            font-medium
            ${types[type]}
            `}
        >
            {labels[type]}
        </span>
    )
}