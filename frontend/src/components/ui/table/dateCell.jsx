export default function DateCell({ date }) {
    return (
        <div>
            <div className="tracking-wider text-gray-800 font-medium ">{date.split(',')[0]}</div>
            <div className="tracking-wider text-gray-400 font-medium ">{date.split(',')[1]}</div>

        </div>
    )
}