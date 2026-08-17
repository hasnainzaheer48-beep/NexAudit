export default function FormActions({ onClose, submitText = "Submit" }) {
    return (
        <div className="flex justify-end gap-3 border-t border-[#e5e5e5] pt-4">
            <button type="button">Cancel</button>
            <button type="submit">{submitText}</button>
        </div>
    )
}