export default function ActivityLogBadge({ newValues, oldValues, action }) {


    const fieldLabels = {
        client_id: "Client",
        manager_id: "Manager",
        assigned_auditor_id: "Assigned Auditor",
        audit_year: "Audit Year",
        audit_type: "Audit Type",
        start_date: "Start Date",
        due_date: "Due Date",
        priority: "Priority",
        status: "Status",
        description: "Description",
        is_archived: "Archived",
        manager: "Manager",
        client: "Client",
        template: "Template",
        id: "Id",
        name: "Name",
        version: "Version",
        "is_active": "Is Active",
        "created_at": "Created At",
        "updated_at": "Updated At",
        title: "Title",
        "template_id": "Template Id",
        "order_number": "Order Number",
        role: "Role",
        "first_name": "First Name",
        "last_name": "Last Name",
        "phone_number": "Phone Number",
        email: "Email",
        industry: "Industry",
        location: "Location",
        "company_name": "Company Name"
    };


    if (action === "Created") {
        return (
            <div className="flex flex-col gap-2">
                <div className="font-bold text-sm text-gray-800">{action} with following data</div>
                {
                    Object.keys(newValues).map((key) => (
                        <div key={key} className="flex w-fit gap-2  bg-gray-100 rounded-2xl px-1 py-0.5 whitespace-nowrap">
                            <div className=" text-sm font-medium text-gray-800 whitespace-nowrap ">
                                {fieldLabels[key] || key}
                            </div>
                            <div className=" text-sm font-medium">
                                <span className="text-[#174d38]">{newValues[key]}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        )

    }


    if (action === "Deleted" || action === "Archived" || action === "Deactivated") {
        return (
            <div className="flex flex-col gap-2">
                <div className="font-bold text-sm text-gray-800">{action} with following data</div>
                {
                    Object.keys(oldValues).map((key) => (
                        <div key={key} className="flex w-fit gap-2  bg-gray-100 rounded-2xl px-1 py-0.5 whitespace-nowrap">
                            <div className=" text-sm font-medium text-gray-800 whitespace-nowrap ">
                                {fieldLabels[key] || key}
                            </div>
                            <div className=" text-sm font-medium">
                                <span className="text-[#174d38]">{oldValues[key]}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        )

    }


    const changes = Object.keys(newValues).filter((key) => oldValues[key] !== newValues[key])

    if (changes.length === 0) {
        return <div className="text-gray-700">
            No Changes
        </div>
    }


    return (
        <div className="space-y-2">
            {
                changes.map((key) => (
                    <div key={key}>
                        <div className=" text-sm font-medium text-gray-800 whitespace-nowrap">
                            {fieldLabels[key] || key}
                        </div>
                        <div className=" text-sm font-medium text-gray-900 bg-gray-100 rounded-2xl px-1 py-0.5 inline whitespace-nowrap">
                            <span>{oldValues[key]}</span>
                            <span className="text-gray-500"> → </span>
                            <span className="text-[#174d38]">{newValues[key]}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )

}