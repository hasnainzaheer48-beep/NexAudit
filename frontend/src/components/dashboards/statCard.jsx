export default function StatCard({ title, stat, Icon, subtitle = '' }) {

    return (
        <div className=" bg-white border border-[#cbcbcb] shadow-md w-full flex items-center px-5 py-4 gap-3 rounded-xl">
            <div className={`size-14 p-2 shrink-0 bg-green-100 text-[#174d38] rounded-full flex items-center justify-center `}>
                <Icon className={`size-8`} />
            </div>
            <div className=" text-left leading-tight ">
                <div className="text-lg font-bold">{title}</div>
                <div className="font-semibold text-4xl text-[#174d38]">{stat}</div>
                <div className="text-sm font-md text-gray-700">{subtitle}</div>
            </div>
        </div>
    )

}