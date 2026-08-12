import {
    BookUser,
    Building,
    Building2,
    ClipboardCheck,
    ClipboardList,
    FileSliders,
    LayoutDashboard,
    List,
    ListTodo,
    RotateCcwClock
} from "lucide-react";

const navigation =
{
    ADMIN: [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Activity Log",
            path: "/activity-logs",
            icon: RotateCcwClock
        },
        {
            name: "Audits",
            path: "/audits",
            icon: ClipboardList
        },
        {
            name: "Audit Templates",
            path: "/audit-templates",
            icon: FileSliders
        },
        {
            name: "Tasks",
            path: "/tasks",
            icon: List
        },
        {
            name: "Users",
            path: "/users",
            icon: BookUser
        },
        {
            name: "Clients",
            path: "/clients",
            icon: Building2
        }



    ],


    MANAGER: [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Activity Log",
            path: "/activity-logs",
            icon: RotateCcwClock
        },
        {
            name: "My Audits",
            path: "/audits/me",
            icon: ClipboardCheck
        },
        {
            name: "Audit Templates",
            path: "/audit-templates",
            icon: FileSliders
        },

        {
            name: "Tasks",
            path: "/tasks/me/manager",
            icon: List
        },

        {
            name: "Clients",
            path: "/clients",
            icon: Building2
        }



    ],

    AUDITOR: [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            name: " My Tasks",
            path: "/tasks/me",
            icon: ListTodo
        },




    ]
}

export default navigation;