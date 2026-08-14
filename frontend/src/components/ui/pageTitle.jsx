export default function PageTitle({ title, color = "text-[#174d38]", variant = "Page" }) {

    const variants = {
        "Page": "text-center text-3xl p-2 mb-2 tracking-wide font-bold bg-white border border-[#cbcbcb] rounded-xl shadow-md",
        "Dashboard": "text-2xl px-3 py-3 font-bold bg-white rounded-t-2xl"
    }

    return (
        <div className={`
        ${variants[variant]}
        ${color}
        `}>
            {title}
        </div>
    )
}