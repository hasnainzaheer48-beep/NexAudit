export default function FormField({ label, children, required = false, size = "Small" }) {

    const styles = {
        "Small": "text-sm",
        "Medium": "text-lg"
    }
    return (
        <label className={`flex flex-col gap-1.5  font-medium text-gray-700 ${styles[size]}`}>
            <span className="font-bold">
                {label}
                {required && <span className="ml-1 text-red-500">*</span>}
            </span>

            {children}
        </label>
    )
}