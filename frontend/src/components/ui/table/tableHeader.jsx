export default function TableHeader({ children }) {
    return (
        <thead className="
        bg-[#f2f2f2]
        border-b
        border-[#cbcbcb]
        ">
            {children}
        </thead>
    )
}