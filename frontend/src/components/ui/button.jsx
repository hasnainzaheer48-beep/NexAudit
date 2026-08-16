import { Archive, Download, Eye, Info, List, Pen, Plus, Trash2, UserRoundMinus } from "lucide-react";

export default function Button({ children, isChildren = true, onClick, variant = "Create", icon = "Create", iconSize = "Normal", size = "Small" }) {

    const variants = {
        "Create": " border-[#174d38] text-[#174d38] hover:bg-[#174d38] hover:text-white transition",
        "Edit": " border-black bg-white text-black hover:bg-black hover:text-white transition ",
        "Archive/Deactivate": " border-[#4d1717] bg-white text-[#4d1717] hover:bg-[#4d1717] hover:text-white transition ",
        "Details": "border-[#174d38] text-[#174d38] hover:bg-[#174d38] hover:text-white transition"
    }

    const sizes = {
        "Large": "px-3 rounded-md font-semibold py-1 text-lg",
        "Small": "px-2 py-1 text-sm font-medium rounded-sm"
    }

    const Icons = {
        "Create": Plus,
        "Edit": Pen,
        "Archive": Archive,
        "Deactivate User": UserRoundMinus,
        "Details": Info,
        "Task": List,
        "View": Eye,
        "Download": Download,
        "Delete": Trash2

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
            {isChildren && <span>{children}</span>}

        </button>
    )
}