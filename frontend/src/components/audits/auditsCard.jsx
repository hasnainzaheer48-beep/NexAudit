import { useNavigate } from "react-router-dom";

export default function AuditsCard({ audit }) {

    const navigate = useNavigate();

    return (
        <div className=" bg-gray-50 min-w-0 max-w-full flex flex-col border border-gray-150 p-3 rounded-xl shadow-xl hover:shadow-2xl hover:scale-101 duration-200">
            <div className="text-3xl font-bold text-center">{audit.client} </div>
            <div className="text-xl">
                <span className="font-bold text-xl">Id: </span>{audit.id}<br />
                <span className="font-bold text-xl">Type: </span>{audit.template}<br />
                <span className="font-bold  text-xl">Manager: </span>{audit.manager}<br />
                <span className="font-bold  text-xl"> Status: </span>{audit.status}<br />
                <span className="font-bold  text-xl">Priority: </span>{audit.priority}<br />
            </div>
            <button className="bg-[#0f172a]
            text-white mt-3 text-xl
            font-semibold p-2 rounded-xl
            hover:cursor-pointer"
                onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}
            >View Details</button>

        </div>
    );


}