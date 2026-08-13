import { PropagateLoader } from "react-spinners";

export default function LoadingScreen() {
    return (
        <div className="min-h-screen bg-[#f2f2f2] flex flex-col items-center justify-center">

            <div className="flex flex-col items-center gap-6">

                <img
                    src="/logo.png"
                    alt="NexAudit"
                    className="w-50"
                />



                <PropagateLoader
                    color={"#174d38"}


                    size={30}

                />


            </div>

        </div>
    )
}