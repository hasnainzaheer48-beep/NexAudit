export default function Table({ children }) {

    return (

        <div className="
        h-full
        bg-white
        border
        border-[#cbcbcb]
        rounded-xl
        overflow-hidden
                    ">
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