import useActivityLogs from "../hooks/useActivityLogs";
import LoadingComponent from "../components/ui/loadingComponent"
import Table from "../components/ui/table/table";
import TableHeader from "../components/ui/table/tableHeader";
import TableRow from "../components/ui/table/tableRow";
import TableHead from "../components/ui/table/tableHead";
import EmptyTable from "../components/ui/table/emptyTable";
import TableCell from "../components/ui/table/tableCell";
import PageTitle from "../components/ui/pageTitle";

export default function ActivityLogs() {

    const { activityLogs, getActivityLogs, error, loading } = useActivityLogs();
    if (loading) return <LoadingComponent />;
    if (error) return <div>{error}</div>
    return (
        <div className="flex flex-col h-full">
            <PageTitle title={"Activity Logs"} subtitle="Track recent changes and actions across NexAudit." />
            <div className="flex-1 min-h-0">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead >Id</TableHead>
                            <TableHead >Entity Id</TableHead>
                            <TableHead >Entity Type</TableHead>
                            <TableHead >Changed By</TableHead>
                            <TableHead >Action</TableHead>
                            <TableHead >Old Value</TableHead>
                            <TableHead >New Value</TableHead>
                            <TableHead >Created At</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {activityLogs.length === 0 ? <EmptyTable message={"No Activity Logs"} /> :
                            activityLogs.map((activityLog) => {
                                return (
                                    <TableRow key={activityLog.id}>
                                        <TableCell >{activityLog.id}</TableCell>
                                        <TableCell >{activityLog.entity_id}</TableCell>
                                        <TableCell >{activityLog.entity_type}</TableCell>
                                        <TableCell >{activityLog.changed_by}</TableCell>
                                        <TableCell >{activityLog.action}</TableCell>
                                        <TableCell >
                                            <pre>
                                                {activityLog.old_value ? JSON.stringify(activityLog.old_value, null, 2) : '-'}
                                            </pre>
                                        </TableCell>
                                        <TableCell >
                                            <pre>
                                                {activityLog.new_value ? JSON.stringify(activityLog.new_value, null, 2) : '-'}
                                            </pre>
                                        </TableCell>
                                        <TableCell >{new Date(activityLog.created_at).toLocaleDateString()}</TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>

            </div>
        </div>
    );
}