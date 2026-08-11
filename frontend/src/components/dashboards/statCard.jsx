export default function StatCard({ title, stat }) {

    return (
        <div className="bg-gray-50 shadow-lg w-full text-center">
            <div className="text-2xl font-bold">{title}</div>
            <div className="font-semibold">{stat}</div>
        </div>
    )

}