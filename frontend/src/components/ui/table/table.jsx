export default function Table({ children, variant = "Page" }) {

    const variants = {
        "Page": "rounded-xl border border-[#cbcbcb]",
        "Dashboard": "rounded-b-xl border-y border-[#cbcbcb]"
    }

    return (

        <div className={`
        h-full
        bg-white

        ${variants[variant]}
        overflow-hidden
                    `}>
            <div className="
            overflow-auto h-full
            ">
                <table className="w-full text-sm">
                    {children}
                </table>
            </div>
        </div>
    )
}