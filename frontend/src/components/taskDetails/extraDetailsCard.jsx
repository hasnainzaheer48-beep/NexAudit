export default function AuditInfoCard({ title, info }) {


    return (
        <div className="px-3 flex flex-col items-center">
            <div className=" font-medium text-sm text-gray-700 ">{title}</div>
            <div className="font-semibold text-[#174d38]">{info}</div>


        </div>
    )
}