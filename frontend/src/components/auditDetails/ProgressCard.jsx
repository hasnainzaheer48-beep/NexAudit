import PageTitle from "../ui/pageTitle";

export default function ProgressCard({ total_task, finished_task, progress }) {
    return (
        <div className="border border-[#cbcbcb] rounded-2xl flex flex-col">
            <PageTitle title={"Progress"} color="text-black" variant="Details" />

            <hr className="text-[#cbcbcb]" />

        </div>
    )
}