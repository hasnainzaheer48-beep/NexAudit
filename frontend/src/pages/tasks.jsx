
import useTasks from "../hooks/useTasks";
import { useState } from "react";
import TasksFormModal from "../components/tasks/tasksFormModal";
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



export default function Tasks() {


    const { loading, error, tasks, getTasks } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();


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
            <PageTitle title={'Tasks'} subtitle="View and track all audit tasks." />
            <div className="flex-1 min-h-0">

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Id</TableHead>
                            <TableHead >Title</TableHead>
                            <TableHead >Audit Id</TableHead>
                            <TableHead >Template Id</TableHead>
                            <TableHead >Company</TableHead>
                            <TableHead >Assigned Auditor</TableHead>
                            <TableHead >Description</TableHead>
                            <TableHead >Priority</TableHead>
                            <TableHead >Status</TableHead>
                            <TableHead >Start Date</TableHead>
                            <TableHead >Due Date</TableHead>
                            <TableHead >Completed At</TableHead>
                            <TableHead >Created At</TableHead>
                            <TableHead >Updated At</TableHead>
                            <TableHead >Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {tasks.length === 0 ? <EmptyTable /> :
                            tasks.map((task) => {
                                return (
                                    <TableRow key={task.id}>
                                        <TableCell >{task.id}</TableCell>
                                        <TableCell >{task.title}</TableCell>
                                        <TableCell >{task.audit_id}</TableCell>
                                        <TableCell >{task.template_task_id}</TableCell>
                                        <TableCell >{task.company}</TableCell>
                                        <TableCell >{task.assigned_auditor ?? 'Not Assigned'}</TableCell>
                                        <TableCell >{task.description}</TableCell>
                                        <TableCell ><PriorityBadge priority={task.priority} /></TableCell>
                                        <TableCell ><StatusBadge status={task.status} /></TableCell>
                                        <TableCell >{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell >{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell >{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell >{new Date(task.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell >{new Date(task.updated_at).toLocaleDateString()}</TableCell>
                                        <TableCell ><Button icon="Edit" variant="Edit" iconSize="Small" onClick={() => {
                                            setSelectedTask(task);
                                            setShowModal(true);
                                        }}>Edit</Button>
                                            <Button icon="Details" iconSize="Small" variant="Details" onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</Button>
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