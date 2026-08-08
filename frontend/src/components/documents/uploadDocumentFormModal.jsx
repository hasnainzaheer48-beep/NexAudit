import Modal from '../ui/Modal'

export default function UploadDocumentFormModal({ isOpen, onClose }) {

    if (!isOpen) return null;

    return (
        <Modal>

            <button onClick={onClose} className='Close'>Close</button>
        </Modal>
    )
}