import TaskInfo from "./taskInfo";

export default function TaskInfoCard({ task }) {
    return (
        <div className="border border-[#cbcbcb] rounded-2xl p-4 flex justify-between w-full overflow-auto">
            <div className="flex-1 min-w-0 flex flex-col gap-4">
                <TaskInfo title={"Company"} info={task.company} />
                <TaskInfo title={"Assigned Auditor"} info={task.assigned_auditor} />
                <TaskInfo title={"Description"} info={task.description} />
                <TaskInfo title={"Priority"} info={task.priority} isPriority={true} />
                <TaskInfo title={"Status"} info={task.status} isStatus={true} />
            </div>
            <div className="w-px bg-[#cbcbcb] mx-5 shrink-0" />
            <div className="flex-1 min-w-0 flex flex-col gap-4">
                <TaskInfo title={"Start Date"} info={task.start_date ? new Date(task.start_date).toLocaleDateString() : '-'} />
                <TaskInfo title={"Due Date"} info={task.due_date ? new Date(task.due_date).toLocaleDateString() : '-'} />
                <TaskInfo title={"Completed At"} info={task.completed ? new Date(task.completed_at).toLocaleDateString() : "-"} />
                <TaskInfo title={"Created At"} info={new Date(task.created_at).toLocaleDateString()} />
                <TaskInfo title={"Updated At"} info={task.updated_at ? new Date(task.updated_at).toLocaleDateString() : '-'} />

            </div>
        </div>
    )
}