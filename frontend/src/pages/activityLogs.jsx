import useActivityLogs from "../hooks/useActivityLogs";

export default function ActivityLogs() {

    const { activityLogs, getActivityLogs, error, loading } = useActivityLogs();
    if (loading) return null;
    if (error) return <div>{error}</div>
    return (
        <table>
            <thead>
                <tr>
                    <th className="border px-4 py-3">Id</th>
                    <th className="border px-4 py-3">Entity Id</th>
                    <th className="border px-4 py-3">Entity Type</th>
                    <th className="border px-4 py-3">Changed By</th>
                    <th className="border px-4 py-3">Action</th>
                    <th className="border px-4 py-3">Old Value</th>
                    <th className="border px-4 py-3">New Value</th>
                    <th className="border px-4 py-3">Created At</th>
                </tr>
            </thead>
            <tbody>
                {
                    activityLogs.map((activityLog) => {
                        return (
                            <tr key={activityLog.id}>
                                <td className="border px-4 py-3">{activityLog.id}</td>
                                <td className="border px-4 py-3">{activityLog.entity_id}</td>
                                <td className="border px-4 py-3">{activityLog.entity_type}</td>
                                <td className="border px-4 py-3">{activityLog.changed_by}</td>
                                <td className="border px-4 py-3">{activityLog.action}</td>
                                <td className="border px-4 py-3">
                                    <pre>
                                        {activityLog.old_value ? JSON.stringify(activityLog.old_value, null, 2) : '-'}
                                    </pre>
                                </td>
                                <td className="border px-4 py-3">
                                    <pre>
                                        {activityLog.new_value ? JSON.stringify(activityLog.new_value, null, 2) : '-'}
                                    </pre>
                                </td>
                                <td className="border px-4 py-3">{new Date(activityLog.created_at).toLocaleDateString()}</td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>

    );
}