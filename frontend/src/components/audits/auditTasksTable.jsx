import { useState } from "react";
import TasksFormModal from "../tasks/tasksFormModal";
import { useNavigate } from "react-router-dom";
import Table from "../ui/table/table";
import TableHeader from "../ui/table/tableHeader";
import TableRow from "../ui/table/tableRow";
import TableHead from "../ui/table/tableHead";
import TableCell from "../ui/table/tableCell";
import PriorityBadge from "../ui/table/priorityBadge";
import StatusBadge from "../ui/table/statusBadge";



export default function AuditTasksTable({ tasks, getTasks }) {

    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();

    const handleClose = () => {
        setShowModal(false);
    }

    return (
        <div>
            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Assigned Auditor</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Start Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Completed At</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <tbody>
                    {
                        tasks?.map((task) => {
                            return (
                                <TableRow key={task.id}>
                                    <TableCell>{task.id}</TableCell>
                                    <TableCell>{task.title}</TableCell>

                                    <TableCell>{task.assigned_auditor ?? 'Not Assigned'}</TableCell>
                                    <TableCell>{task.description}</TableCell>
                                    <TableCell><PriorityBadge priority={task.priority} /></TableCell>
                                    <TableCell><StatusBadge status={task.status} /></TableCell>
                                    <TableCell>{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</TableCell>
                                    <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</TableCell>
                                    <TableCell>{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'Null'}</TableCell>
                                    <TableCell>{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(task.updated_at).toLocaleDateString()}</TableCell>
                                    <TableCell><button className="border px-2 mr-1" onClick={() => {
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
    )
}