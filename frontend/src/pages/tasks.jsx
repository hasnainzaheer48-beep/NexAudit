import { useParams } from "react-router-dom";
import useTasks from "../hooks/useTasks";
import { useState } from "react";
import TemplateTasksFormModal from "../components/templateTasks/templateTasksFormModal";



export default function Tasks() {


    const { loading, error, tasks, getTasks } = useTasks();
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);



    const handleCreateTask = () => {
        setShowModal(true);
        setSelectedTask(null);
    }

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
            <button className="border" onClick={handleCreateTask}>Create Tasks</button>

            <table className="mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">Title</th>
                        <th className="border px-4 py-3">Audit Id</th>
                        <th className="border px-4 py-3">Template Id</th>
                        <th className="border px-4 py-3">Company</th>
                        <th className="border px-4 py-3">Assigned Auditor</th>
                        <th className="border px-4 py-3">Description</th>
                        <th className="border px-4 py-3">Priority</th>
                        <th className="border px-4 py-3">Status</th>
                        <th className="border px-4 py-3">Start Date</th>
                        <th className="border px-4 py-3">Due Date</th>
                        <th className="border px-4 py-3">Created At</th>
                        <th className="border px-4 py-3">Updated At</th>
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
                                    <td className="border px-4 py-3">{task.template_task_id}</td>
                                    <td className="border px-4 py-3">{task.company}</td>
                                    <td className="border px-4 py-3">{task.assigned_auditor ?? 'Not Assigned'}</td>
                                    <td className="border px-4 py-3">{task.description}</td>
                                    <td className="border px-4 py-3">{task.priority}</td>
                                    <td className="border px-4 py-3">{task.status}</td>
                                    <td className="border px-4 py-3">{new Date(task.start_date).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3">{new Date(task.due_date).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3">{new Date(task.created_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3">{new Date(task.updated_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3"><button className="border px-2 mr-1" onClick={() => {
                                        setSelectedTask(task);
                                        setShowModal(true);
                                    }}>Edit</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {/* <TemplateTasksFormModal
                isOpen={showModal}
                selectedTemplateTask={selectedTemplateTask}
                onClose={handleClose}
                onTemplateTaskCreated={getTemplateTasks}
                templateId={templateId} /> */}
        </div>



    );
}