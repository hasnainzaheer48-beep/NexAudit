import { useParams } from "react-router-dom";
import useTemplateTasks from "../hooks/useTemplateTasks";
import { useState } from "react";
import TemplateTasksFormModal from "../components/templateTasks/templateTasksFormModal";
import api from "../api/axios";
import LoadingComponent from "../components/ui/loadingComponent";
import PageTitle from "../components/ui/pageTitle";
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import TableCell from "../components/ui/table/tableCell";
import PriorityBadge from "../components/ui/table/priorityBadge";
import EmptyTable from "../components/ui/table/emptyTable";
import Button from "../components/ui/button";




export default function TemplateTasks() {

    const { templateId } = useParams();
    const { loading, error, templateTasks, getTemplateTasks, setTemplateTasks } = useTemplateTasks(templateId);
    const [showModal, setShowModal] = useState(false);
    const [selectedTemplateTask, setSelectedTemplateTask] = useState(null);



    const handleCreateTemplateTask = () => {
        setShowModal(true);
        setSelectedTemplateTask(null);
    }

    const handleClose = () => {
        setShowModal(false);
    }


    const handleArchive = async (templateTask) => {
        try {

            const templateTaskId = templateTask.id;
            await api.patch(`/api/template-tasks/archive/${templateTaskId}`);
            setTemplateTasks((prev) => {
                return prev.filter((templateTask) => templateTask.id !== templateTaskId);
            })



        } catch (error) {
            console.error(error);

        }
    }

    if (loading) {
        return <LoadingComponent />
    }

    if (error) {
        return <>{error.message}</>
    }


    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center">
                <PageTitle title={"Template Tasks"} />
                <Button onClick={handleCreateTemplateTask}>Create Template Tasks</Button>
            </div>
            <div className="flex-1 min-h-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Order Number</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead>Updated At</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {templateTasks.length === 0 ? <EmptyTable /> :
                            templateTasks.map((templateTask) => {
                                return (
                                    <TableRow key={templateTask.id}>
                                        <TableCell>{templateTask.id}</TableCell>
                                        <TableCell>{templateTask.title}</TableCell>
                                        <TableCell>{templateTask.description}</TableCell>
                                        <TableCell><PriorityBadge priority={templateTask.priority} /></TableCell>
                                        <TableCell>{templateTask.order_number}</TableCell>
                                        <TableCell>{new Date(templateTask.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell>{new Date(templateTask.updated_at).toLocaleDateString()}</TableCell>
                                        <TableCell><Button icon="Edit" variant="Edit" iconSize="Small" onClick={() => {
                                            setSelectedTemplateTask(templateTask);
                                            setShowModal(true);
                                        }}>Edit</Button>
                                            <button onClick={() => {
                                                return handleArchive(templateTask)
                                            }}>
                                                Archive
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <TemplateTasksFormModal
                    isOpen={showModal}
                    selectedTemplateTask={selectedTemplateTask}
                    onClose={handleClose}
                    onTemplateTaskCreated={getTemplateTasks}
                    templateId={templateId} />
            </div>
        </div>



    );
}