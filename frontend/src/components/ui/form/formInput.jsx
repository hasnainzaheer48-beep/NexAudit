export default function FormInput(props) {
    return (
        <input
            {...props}
            className="
                w-full
                rounded-lg
                border border-[#cbcbcb]
                bg-white
                px-3 py-2
                text-sm
                text-gray-800
                outline-none
                transition
                focus:border-[#174D38]
                focus:ring-2
                focus:ring-[#174D38]/10
            "
        />
    )
}