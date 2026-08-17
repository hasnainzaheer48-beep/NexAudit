export default function FormField({ label, children, required = false }) {
    return (
        <label className="flex flex-col gap-1.5 text-sm font-medium text-gray-700">
            <span>
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>

            {children}
        </label>
    )
}