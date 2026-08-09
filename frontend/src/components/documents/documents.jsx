import { useState } from "react";
import ShowTaskDocuments from "./showTaskDocuments"
import UploadDocumentFormModal from "./uploadDocumentFormModal"



export default function Documents({ user, taskId, getTask }) {

    const [showModal, setShowModal] = useState(false);

    const handleUpload = () => {
        setShowModal(true);
    }


    const handleClose = () => {
        setShowModal(false);
    }


    return (
        <div>

            <ShowTaskDocuments taskId={taskId} />
            {(user.role === "AUDITOR") && <button onClick={handleUpload} className="border p-1 mb-2">Add Docs</button>}<br />
            <UploadDocumentFormModal isOpen={showModal} onClose={handleClose} taskId={taskId} onUploaded={getTask} />
        </div>

    )
}

