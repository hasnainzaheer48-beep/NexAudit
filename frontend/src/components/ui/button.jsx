import { Pen, Plus } from "lucide-react";

export default function Button({ children, onClick, variant = "Create", icon = "Create", iconSize = "Normal", size = "Small" }) {

    const variants = {
        "Create": " border-[#174d38] text-[#174d38] hover:bg-[#174d38] hover:text-white transition",
        "Edit": " border-black bg-white text-black hover:bg-black hover:text-white transition "
    }

    const sizes = {
        "Large": "px-3 rounded-md font-bold py-1 text-lg",
        "Small": "px-2 py-1 text-xs font-medium rounded-sm"
    }

    const Icons = {
        "Create": Plus,
        "Edit": Pen

    }

    const iconSizes = {
        "Normal": "stroke-3",
        "Small": "stroke-2 size-5"
    }

    let Icon = Icons[icon];

    return (
        <button className={`
                    flex
                    gap-1
                    items-center
                    
                    
                    border
                    
                    hover:cursor-pointer
                    ${variants[variant]}
                    ${sizes[size]}
                    `} onClick={onClick}>

            <div className="flex justify-center items-center">
                <Icon className={`${iconSizes[iconSize]}`} />
            </div>
            <span>{children}</span>

        </button>
    )
}