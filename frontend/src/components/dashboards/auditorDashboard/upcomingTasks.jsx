import api from '../../../api/axios'
import useUpcoming from '../../../hooks/useUpcoming'

export default function UpcomingAudits({ role }) {

    const { loading, error, upcoming } = useUpcoming(role);
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className="bg-gray-50 w-full">
            <div>Upcoming Audits</div>
            <div>
                <table className="mt-4">
                    <thead>
                        <tr>

                            <th className="border px-4 py-3">Title</th>
                            <th className="border px-4 py-3">Audit Id</th>
                            <th className="border px-4 py-3">Company</th>
                            <th className="border px-4 py-3">Priority</th>
                            <th className="border px-4 py-3">Status</th>
                            <th className="border px-4 py-3">Start Date</th>
                            <th className="border px-4 py-3">Due Date</th>

                            <th className="border px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            upcoming.map((task) => {
                                return (
                                    <tr key={task.id}>

                                        <td className="border px-4 py-3">{task.title}</td>
                                        <td className="border px-4 py-3">{task.audit_id}</td>

                                        <td className="border px-4 py-3">{task.company}</td>


                                        <td className="border px-4 py-3">{task.priority}</td>
                                        <td className="border px-4 py-3">{task.status}</td>
                                        <td className="border px-4 py-3">{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</td>
                                        <td className="border px-4 py-3">{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</td>


                                        <td className="border px-4 py-3">
                                            <button className="border px-2 mr-1" onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</button></td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}