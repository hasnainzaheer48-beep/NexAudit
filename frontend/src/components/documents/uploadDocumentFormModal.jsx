import { useEffect, useState } from 'react';
import Modal from '../ui/Modal'
import api from '../../api/axios';


export default function UploadDocumentFormModal({ isOpen, onClose, taskId, onUploaded }) {

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }

    const handleFile = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("description", description);
            await api.post(`/api/tasks/${taskId}/documents`, formData);
            setFile(null);
            setDescription('');
            onUploaded();
            onClose();


        }
        catch (error) {
            console.error(error);

        }



    }


    useEffect(() => {
        setFile(null);
        setDescription('');
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <Modal title={"Upload Document"}
            subtitle={"Attach a document to this task"}
            onClose={onClose} size="xl">
            <form onSubmit={handleSubmit}>
                <label>
                    <input className='border' type="file" name='file' onChange={handleFile} required />
                </label>
                <label>
                    Description <input type="text" name="description" value={description} onChange={handleDescription} />
                </label>
                <button>Upload</button>
            </form>


        </Modal>
    )
}