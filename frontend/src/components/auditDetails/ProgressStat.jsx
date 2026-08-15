import { ClipboardCheck, ClipboardClock } from "lucide-react"

export default function ProgressStat({ subtitle, progress }) {

    const icons = {
        "Completed": ClipboardCheck,
        "Pending": ClipboardClock
    }

    const styles = {
        "Completed": "bg-green-100 text-[#174d38] ",
        "Pending": "bg-yellow-100 text-yellow-700"
    }

    let Icon = icons[subtitle];

    return (
        <div id="Progress Stats" className="flex items-center gap-1" >
            <div className={`size-11 flex items-center justify-center rounded-2xl ${styles[subtitle]}`}>< Icon className="stroke-1-25 size-7" /></div>
            <div>
                <div className="text-sm font-medium">{progress}</div>
                <div className="text-xs text-gray-700 tracking-wider ">{subtitle}</div>
            </div>
        </div>
    )
}