import { useState } from "react";
import CreateCommentFormModal from "./createCommentFormModal";
import ShowTaskComments from "./showTaskComments";
import useComements from "../../hooks/useComments";


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
        <div id="Comment-Section" className="flex flex-col">
            <div id="Comment-Section-Header" className="flex items-center justify-between p-2 px-3">
                <div className="font-bold">Comments</div>
                <div><button className="border p-1 font-semibold" onClick={handleCreate}>Create Comment</button></div>
            </div>
            <div id="Comment-Cards-Box" className="flex-1">
                <ShowTaskComments taskId={taskId} comments={comments} setComments={setComments} getComments={getComments} />
            </div>
            <CreateCommentFormModal isOpen={showModal} onClose={handleClose} taskId={taskId} onCreated={getComments} />
        </div>
    )
}