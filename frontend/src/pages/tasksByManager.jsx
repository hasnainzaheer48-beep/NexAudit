import { useState } from "react";
import TasksFormModal from "../components/tasks/tasksFormModal";
import { useNavigate } from "react-router-dom";
import useTasksByManager from "../hooks/useTasksByManager";
import Table from "../components/ui/table/table";
import TableHead from "../components/ui/table/tableHead";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableCell from "../components/ui/table/tableCell";
import PriorityBadge from "../components/ui/table/priorityBadge";
import StatusBadge from "../components/ui/table/statusBadge";
import PageTitle from "../components/ui/pageTitle";


export default function TasksByManager() {
    const { loading, error, tasks, getTasks } = useTasksByManager();
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();


    const handleClose = () => {
        setShowModal(false);
    }

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        return <>{error.message}</>
    }


    return (
        <div className="flex flex-col h-full">
            <PageTitle title={"Tasks"} />
            <div className="flex-1 min-h-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Audit Id</TableHead>

                            <TableHead>Company</TableHead>
                            <TableHead>Assigned Auditor</TableHead>

                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Completed At</TableHead>

                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {
                            tasks.map((task) => {
                                return (
                                    <TableRow key={task.id}>
                                        <TableCell >{task.id}</TableCell>
                                        <TableCell >{task.title}</TableCell>
                                        <TableCell >{task.audit_id}</TableCell>

                                        <TableCell >{task.company}</TableCell>
                                        <TableCell >{task.assigned_auditor ?? 'Not Assigned'}</TableCell>

                                        <TableCell ><PriorityBadge priority={task.priority} /> </TableCell>
                                        <TableCell ><StatusBadge status={task.status} /></TableCell>
                                        <TableCell >{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell >{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell >{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'Null'}</TableCell>

                                        <TableCell ><button className="border px-2 mr-1" onClick={() => {
                                            setSelectedTask(task);
                                            setShowModal(true);
                                        }}>Edit</button>
                                            <button className="border px-2 mr-1" onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <TasksFormModal
                    isOpen={showModal}
                    selectedTask={selectedTask}
                    onClose={handleClose}
                    onTaskCreated={getTasks}
                />
            </div>

        </div>


    );
}
