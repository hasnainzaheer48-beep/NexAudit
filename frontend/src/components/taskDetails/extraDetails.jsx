import PageTitle from "../ui/pageTitle";
import ExtraDetailsCard from './extraDetailsCard'



export default function ExtraDetails({ task }) {
    return (

        <div className="gap-2 flex flex-col min-h-0 border border-[#cbcbcb] rounded-2xl">
            <PageTitle title={"Extra Details"} color="text-gray-800" variant="Details" titleIcon={true} />
            <div className="flex justify-evenly p-4">
                <ExtraDetailsCard title={"Task Id"} info={task.id} />
                <div className="border-r border-[#cbcbcb]" />
                <ExtraDetailsCard title={"Audit Id"} info={task.audit_id} />
                <div className="border-r border-[#cbcbcb]" />
                <ExtraDetailsCard title={"Template Task id"} info={task.template_task_id} />
                <div className="border-r border-[#cbcbcb]" />
                <ExtraDetailsCard title={"Assigned Auditor"} info={task.assigned_auditor_id} />
            </div>
        </div>

    )
}