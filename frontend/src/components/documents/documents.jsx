import { useState } from "react";
import ShowTaskDocuments from "./showTaskDocuments"
import UploadDocumentFormModal from "./uploadDocumentFormModal"
import PageTitle from '../ui/pageTitle'
import { Folder } from "lucide-react";
import Button from "../ui/button";



export default function Documents({ user, taskId, getTask }) {

    const [showModal, setShowModal] = useState(false);

    const handleUpload = () => {
        setShowModal(true);
    }


    const handleClose = () => {
        setShowModal(false);
    }


    return (
        <div className="flex flex-col border border-[#cbcbcb] rounded-2xl p-2 gap-4">
            <div className="flex justify-between">
                <PageTitle title={"Documents"} color="text-gray-800" variant="Details" titleIcon={true} />
                {(user.role === "AUDITOR") && <Button onClick={handleUpload} variant="Upload" icon="Upload" size="Normal" iconSize="Small">Upload Document</Button>}
            </div>
            <hr className="text-[#cbcbcb]" />
            <ShowTaskDocuments taskId={taskId} />
            <UploadDocumentFormModal isOpen={showModal} onClose={handleClose} taskId={taskId} onUploaded={getTask} />
        </div>

    )
}

