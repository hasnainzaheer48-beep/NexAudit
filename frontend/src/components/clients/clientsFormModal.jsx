import Modal from "../ui/Modal";

export default function ClientsFormModal({ isOpen, onClose, onClientCreated, selectedClient }) {

    if (!isOpen) return null;


    return (
        <Modal>
            <form>
                <label>Company Name<input type="text" required /></label>
                <label>Email<input type="text" required /></label>
                <label>Location<input type="text" required /></label>
                <label>Phone Number<input type="text" required /></label>
                <label>Industry<input type="text" required /></label>
            </form>
            <button className="border" onClick={onClose} >Close</button>
        </Modal>
    );
}