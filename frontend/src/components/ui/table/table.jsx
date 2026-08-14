export default function Table({ children, variant = "Page" }) {

    const variants = {
        "Page": "rounded-xl",
        "Dashboard": "rounded-b-xl"
    }

    return (

        <div className={`
        h-full
        bg-white
        border
        border-[#cbcbcb]
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