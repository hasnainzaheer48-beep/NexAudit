export default function StatCard({ title, stat, Icon }) {

    return (
        <div className="relative bg-white border border-[#cbcbcb] shadow-lg w-full text-center flex justify-center items-center px-2 py-4 rounded-lg">
            <div className={` absolute left-3 size-14 shrink-0 bg-[#174d38] text-white p-2 rounded-full `}>
                <Icon className={` size-10`} />
            </div>
            <div className="ml-2 leading-4">
                <div className="text-lg font-bold">{title}</div>
                <div className="font-semibold text-4xl text-[#174d38]">{stat}</div>
            </div>
        </div>
    )

}