export default function StatusBadge({ status }) {
    const styles = {
        Draft: "bg-blue-100 text-blue-700",
        "In Progress": "bg-green-100 text-[#174d38]",
        Finished: "bg-green-100 text-[#174d38]",
    }


    return (
        <span className={`
            px-3
            py-1
            rounded-full
            text-xs
            font-medium text-nowrap
            ${styles[status]}
        `}>
            {status}
        </span>
    );

}