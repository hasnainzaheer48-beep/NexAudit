import api from '../../../api/axios'
import useOverdue from '../../../hooks/useOverdue'
import Table from '../../ui/table/table';
import TableHeader from '../../ui/table/tableHeader'
import TableHead from '../../ui/table/tableHead'

export default function OverdueAudits({ role }) {

    const { loading, error, overdue } = useOverdue(role);
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className="bg-gray-50 flex-1">
            <div>OverDue Audits</div>
            <div>
                <Table>

                    <TableHeader>

                        <tr>
                            <TableHead>Id</TableHead>
                            <TableHead>Client Id</TableHead>
                            <TableHead>Template Id</TableHead>



                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>

                            <TableHead>Action</TableHead>
                        </tr>

                    </TableHeader>
                    <tbody>
                        {
                            overdue.map((audit) => {
                                return (
                                    <tr key={audit.id}>
                                        <td className="border px-4 py-3">{audit.id}</td>
                                        <td className="border px-4 py-3">{audit.client}</td>
                                        <td className="border px-4 py-3">{audit.template}</td>


                                        <td className="border px-4 py-3">{audit.priority}</td>
                                        <td className="border px-4 py-3">{audit.status}</td>



                                        <td className="border px-4 py-3">

                                            <button className="border px-2 mr-1" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}