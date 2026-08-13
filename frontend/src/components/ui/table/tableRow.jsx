export default function TableRow({ children }) {
    return (
        <tr className="
            border-b
            border-[#cbcbcb]
            hover:bg-[#f2f2f2]
            transition-colors
            last:border-0
        ">
            {children}
        </tr>
    )
}