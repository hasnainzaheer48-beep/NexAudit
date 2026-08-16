import { EllipsisVertical, Folder, MessageSquare } from "lucide-react"

export default function PageTitle({ title, color = "text-[#174d38]", variant = "Page", subtitle = "", titleIcon = false }) {

    const variants = {
        "Page": " text-3xl p-2 mb-2 tracking-wide font-bold bg-white",
        "Dashboard": "text-2xl px-3 py-3 font-bold bg-white rounded-t-2xl",
        "Details": "text-xl px-3 py-3 font-bold bg-white rounded-t-2xl"

    }

    const icons = {
        "Documents": Folder,
        "Comments": MessageSquare,
        "Extra Details": EllipsisVertical
    }

    let Icon;
    if (titleIcon) {
        Icon = icons[title];
    }

    return (

        <div className={`${variants[variant]} ${color}`}>
            <div className="flex gap-2">
                {titleIcon && <div className="flex items-center justify-center"><Icon /></div>}
                <div>{title}</div>
            </div>
            <div className=" text-sm font-medium text-gray-600">{subtitle}</div>
        </div>


    )
}