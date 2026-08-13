export default function TableHeader({ children }) {
    return (
        <thead className="
        sticky
        top-0
        z-10
        bg-[#f2f2f2]
        border-b
        border-[#cbcbcb]
        ">
            {children}
        </thead>
    )
}