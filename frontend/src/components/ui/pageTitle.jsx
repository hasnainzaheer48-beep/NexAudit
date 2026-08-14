export default function PageTitle({ title, color = "text-[#174d38]" }) {
    return (
        <div className={`text-center
        text-3xl
        p-2 mb-2 
        tracking-wide 
        font-bold
         bg-white border border-[#cbcbcb]
        rounded-xl shadow-md
        ${color}
        `}>
            {title}
        </div>
    )
}