import { useState } from "react";
import useTasksByAuditor from "../hooks/useTasksByAuditor"
import TasksByAuditorFormModal from "../components/tasksByAuditor/tasksByAuditorFormModal";
import { useNavigate } from "react-router-dom";


export default function TasksByAuditor() {

    const { tasks, loading, error, getTasksByAuditor } = useTasksByAuditor();
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const navigate = useNavigate();

    console.log(tasks);
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
        <div>


            <table className="mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">Title</th>
                        <th className="border px-4 py-3">Audit Id</th>
                        <th className="border px-4 py-3">Company</th>
                        <th className="border px-4 py-3">Priority</th>
                        <th className="border px-4 py-3">Status</th>
                        <th className="border px-4 py-3">Start Date</th>
                        <th className="border px-4 py-3">Due Date</th>
                        <th className="border px-4 py-3">Completed At</th>
                        <th className="border px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map((task) => {
                            return (
                                <tr key={task.id}>
                                    <td className="border px-4 py-3">{task.id}</td>
                                    <td className="border px-4 py-3">{task.title}</td>
                                    <td className="border px-4 py-3">{task.audit_id}</td>

                                    <td className="border px-4 py-3">{task.company}</td>


                                    <td className="border px-4 py-3">{task.priority}</td>
                                    <td className="border px-4 py-3">{task.status}</td>
                                    <td className="border px-4 py-3">{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</td>
                                    <td className="border px-4 py-3">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</td>
                                    <td className="border px-4 py-3">{task.completed_at ? new Date(task.completed_at).toLocaleDateString() : 'Null'}</td>

                                    <td className="border px-4 py-3"><button className="border px-2 mr-1" onClick={() => {
                                        setSelectedTask(task);
                                        setShowModal(true);
                                    }}>Edit Status</button>
                                        <button className="border px-2 mr-1" onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <TasksByAuditorFormModal
                isOpen={showModal}
                selectedTask={selectedTask}
                onClose={handleClose}
                onTaskUpdated={getTasksByAuditor}
            />
        </div>



    );
}