import { Plus } from "lucide-react";

export default function Button({ children, onClick, variant = "Create" }) {

    const variants = {
        "Create": " text-lg border-[#174d38] text-[#174d38] hover:bg-[#174d38] hover:text-white transition"
    }

    const Icons = {
        "Create": Plus,

    }

    return (
        <button className={`
                    flex
                    gap-1
                    items-center
                    px-3 py-1
                    rounded-md
                    border
                    font-bold
                    hover:cursor-pointer
                    ${variants[variant]}
                    `} onClick={onClick}>

            <div className="flex justify-center items-center">
                <Plus className="stroke-3" />
            </div>
            <span>{children}</span>

        </button>
    )
}