import { useParams } from "react-router-dom";
import useTemplateTasks from "../hooks/useTemplateTasks";
import { useState } from "react";
import TemplateTasksFormModal from "../components/templateTasks/templateTasksFormModal";



export default function TemplateTasks() {

    const { templateId } = useParams();
    const { loading, error, templateTasks, getTemplateTasks } = useTemplateTasks(templateId);
    const [showModal, setShowModal] = useState(false);
    const [selectedTemplateTask, setSelectedTemplateTask] = useState(null);



    const handleCreateTemplateTask = () => {
        setShowModal(true);
        setSelectedTemplateTask(null);
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
            <button className="border" onClick={handleCreateTemplateTask}>Create Template Tasks</button>

            <table className="mt-4">
                <thead>
                    <tr>
                        <th className="border px-4 py-3">Id</th>
                        <th className="border px-4 py-3">Title</th>
                        <th className="border px-4 py-3">Description</th>
                        <th className="border px-4 py-3">Priority</th>
                        <th className="border px-4 py-3">Order Number</th>
                        <th className="border px-4 py-3">Created At</th>
                        <th className="border px-4 py-3">Updated At</th>
                        <th className="border px-4 py-3">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        templateTasks.map((templateTask) => {
                            return (
                                <tr key={templateTask.id}>
                                    <td className="border px-4 py-3">{templateTask.id}</td>
                                    <td className="border px-4 py-3">{templateTask.title}</td>
                                    <td className="border px-4 py-3">{templateTask.description}</td>
                                    <td className="border px-4 py-3">{templateTask.priority}</td>
                                    <td className="border px-4 py-3">{templateTask.order_number}</td>
                                    <td className="border px-4 py-3">{new Date(templateTask.created_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3">{new Date(templateTask.updated_at).toLocaleDateString()}</td>
                                    <td className="border px-4 py-3"><button className="border px-2 mr-1" onClick={() => {
                                        setSelectedTemplateTask(templateTask);
                                        setShowModal(true);
                                    }}>Edit</button></td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <TemplateTasksFormModal
                isOpen={showModal}
                selectedTemplateTask={selectedTemplateTask}
                onClose={handleClose}
                onTemplateTaskCreated={getTemplateTasks}
                templateId={templateId} />
        </div>



    );
}