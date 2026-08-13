export default function PageTitle({ title }) {
    return (
        <div className="text-center
        text-3xl
        p-2 mb-2 
        tracking-wide 
        font-bold
        text-[#174d38] bg-white border border-[#cbcbcb]
        rounded-xl shadow-md">
            {title}
        </div>
    )
}