export default function PageTitle({ title, color = "text-[#174d38]", variant = "Page", subtitle = "" }) {

    const variants = {
        "Page": " text-3xl p-2 mb-2 tracking-wide font-bold bg-white",
        "Dashboard": "text-2xl px-3 py-3 font-bold bg-white rounded-t-2xl"
    }

    return (

        <div className={`${variants[variant]} ${color}`}>
            <span>{title}</span>
            <div className=" text-sm font-medium text-gray-600">{subtitle}</div>
        </div>


    )
}