import { useState } from "react";
import CreateCommentFormModal from "./createCommentFormModal";
import ShowTaskComments from "./showTaskComments";
import useComements from "../../hooks/useComments";
import PageTitle from "../ui/pageTitle";
import Button from "../ui/button";


export default function Comments({ taskId, }) {

    const [showModal, setShowModal] = useState(false);
    const { loading, error, comments, getComments, setComments } = useComements(taskId);



    const handleCreate = () => {
        setShowModal(true);
    }


    const handleClose = () => {
        setShowModal(false);
    }




    if (loading) return null;
    if (error) return console.log(error);

    return (
        <div id="Comment-Section" className="flex flex-col p-2 rounded-2xl border border-[#cbcbcb] gap-4">
            <div id="Comment-Section-Header" className="flex  justify-between">
                <PageTitle title={"Comments"} titleIcon={true} color="text-gray-800" variant="Details" />
                <Button iconSize="Small" size="Normal" variant="Upload" onClick={handleCreate}> Comment</Button >
            </div>
            <div id="Comment-Cards-Box" className="flex-1 border border-[#cbcbcb]  rounded-2xl">
                <ShowTaskComments taskId={taskId} comments={comments} setComments={setComments} getComments={getComments} />
            </div>
            <CreateCommentFormModal isOpen={showModal} onClose={handleClose} taskId={taskId} onCreated={getComments} />
        </div>
    )
}