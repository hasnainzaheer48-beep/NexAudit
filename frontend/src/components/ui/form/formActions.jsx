import Button from "../button";

export default function FormActions({ onClose, submitText = "Submit" }) {
    return (
        <div className="flex justify-end gap-3 border-t border-[#e5e5e5] pt-4">
            <Button variant="Cancel" icon="Cancel" onClick={onClose}>Cancel</Button>
            <Button icon="Done" type="submit">{submitText}</Button>
        </div>
    )
}