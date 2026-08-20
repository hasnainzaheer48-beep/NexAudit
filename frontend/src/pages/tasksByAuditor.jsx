import { useState } from "react";
import useTasksByAuditor from "../hooks/useTasksByAuditor"
import TasksByAuditorFormModal from "../components/tasksByAuditor/tasksByAuditorFormModal";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../components/ui/loadingComponent";
import PageTitle from "../components/ui/pageTitle";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import TableCell from "../components/ui/table/tableCell";
import PriorityBadge from "../components/ui/table/priorityBadge";
import StatusBadge from "../components/ui/table/statusBadge";
import EmptyTable from "../components/ui/table/emptyTable";
import Button from "../components/ui/button";
import Pagination from "../components/ui/pagination";


export default function TasksByAuditor() {

    const [page, setPage] = useState(1)
    const { tasks, pagination, loading, error, getTasksByAuditor } = useTasksByAuditor();
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();

    console.log(tasks);
    const handleClose = () => {
        setShowModal(false);
    }

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <>{error.message}</>
    }




    return (
        <div className="flex flex-col h-full">
            <PageTitle title={"My Tasks"} subtitle="View, manage, and track assigned audit tasks." />
            <div className="flex-1 min-h-0">

                <Table className="mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Audit Id</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Completed At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {tasks.length === 0 ? <EmptyTable /> :
                            tasks.map((task) => {
                                return (
                                    <TableRow key={task.id}>
                                        <TableCell>{task.id}</TableCell>
                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.audit_id}</TableCell>

                                        <TableCell>{task.company}</TableCell>


                                        <TableCell><PriorityBadge priority={task.priority} /></TableCell>
                                        <TableCell>< StatusBadge status={task.status} /></TableCell>
                                        <TableCell>{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell>{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'Null'}</TableCell>

                                        <TableCell>
                                            <div className="flex gap-2">


                                                <Button variant="Edit" icon="Edit" iconSize="Small" onClick={() => {
                                                    setSelectedTask(task);
                                                    setShowModal(true);
                                                }}>Status</Button>
                                                <Button icon="Details" variant="Details" iconSize="Small" onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <TasksByAuditorFormModal
                    isOpen={showModal}
                    selectedTask={selectedTask}
                    onClose={handleClose}
                    onTaskUpdated={getTasksByAuditor}
                />
            </div>
            <Pagination pagination={pagination} onPageChange={setPage} />
        </div >



    );
}