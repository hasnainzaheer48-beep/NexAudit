import Button from "./button";
import Modal from "./Modal";

export default function ConfirmModal({ isOpen,
    onClose,
    onConfirm,
    title = "Are You Sure",
    message = "These changes are irreversable",
    action = "Delete",
    entity = ''
}) {
    if (!isOpen) return null;
    return (
        <Modal onClose={onClose} title={title}>
            <div className="py-3">
                <div className="font-medium px-2">{message}</div>
                <div className="pt-6 flex justify-end gap-3">
                    <Button variant={(action === "Deactivate User" || action === "Delete" || action === "Archive" || action === "Deactivate") ? "Create" : "Cancel"} icon="Cancel" iconSize="Small" onClick={onClose}>Cancel</Button>
                    <Button variant={action} icon={action} iconSize="Small" onClick={onConfirm}>{action}</Button>
                </div>
            </div>
        </Modal>
    )
}