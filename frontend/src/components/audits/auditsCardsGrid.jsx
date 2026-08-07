export default function AuditsCardsGrid() {
    return (<div>
        {(user?.role === "MANAGER") && <button className="bg-[#174d38]
                text-white mt-3 text-xl
                font-bold p-4 rounded-2xl mb-3
                hover:cursor-pointer
                hover:scale-102
                duration-200" onClick={handleCreateAudit}>Create Audit</button>}
        <div className="grid sm:grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-4 w-full">

            {
                audits.map((audit) => {

                    return <AuditsCard key={audit.id} audit={audit} />
                })
            }
        </div>


    </div>)
}