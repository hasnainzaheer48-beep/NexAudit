export default function Table({ children }) {

    return (

        <div className="
        bg-white
        border
        border-[#cbcbcb]
        rounded-xl
        overrflow-hidden
                    ">
            <div className="
            overflow-x-auto
            ">
                <table className="w-full text-sm">
                    {children}
                </table>
            </div>
        </div>
    )
}