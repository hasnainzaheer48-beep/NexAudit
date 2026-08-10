const navigation =
{
    ADMIN: [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Activity Log",
            path: "/activity-logs"
        },
        {
            name: "Audits",
            path: "/audits"
        },
        {
            name: "Audit Templates",
            path: "/audit-templates"
        },
        {
            name: "Tasks",
            path: "/tasks"
        },
        {
            name: "Users",
            path: "/users"
        },
        {
            name: "Clients",
            path: "/clients"
        }



    ],


    MANAGER: [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: "Activity Log",
            path: "/activity-logs"
        },
        {
            name: "My Audits",
            path: "/audits/me"
        },
        {
            name: "Audit Templates",
            path: "/audit-templates"
        },

        {
            name: "Tasks",
            path: "/tasks/me/manager"
        },

        {
            name: "Clients",
            path: "/clients"
        }



    ],

    AUDITOR: [
        {
            name: "Dashboard",
            path: "/dashboard"
        },
        {
            name: " My Tasks",
            path: "/tasks/me"
        },




    ]
}

export default navigation;