import Button from "./button";
import Modal from "./Modal";

export default function ConfirmModal({ isOpen, onClose, onConfirm, selectedEntity }) {
    if (!isOpen) return null;
    return (
        <Modal onClose={onClose} title="Are Your Sure?">
            <div className="py-5">
                <div className="bg-red-100 text-red-600">Are you sure u want to delete this audit</div>
                <div>
                    <Button variant="Cancel" icon="Cancel" iconSize="Small" onClick={onClose}>cancel</Button>
                    <Button variant="Create" icon="Done" iconSize="Small" onClick={onConfirm}>Confirm</Button>
                </div>
            </div>
        </Modal>
    )
}