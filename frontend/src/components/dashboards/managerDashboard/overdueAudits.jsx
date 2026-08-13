import api from '../../../api/axios'
import useOverdue from '../../../hooks/useOverdue'
import Table from '../../ui/table/table';
import TableHeader from '../../ui/table/tableHeader'

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
                            <th className="border px-4 py-3">Id</th>
                            <th className="border px-4 py-3">Client Id</th>
                            <th className="border px-4 py-3">Template Id</th>



                            <th className="border px-4 py-3">Priority</th>
                            <th className="border px-4 py-3">Status</th>

                            <th className="border px-4 py-3">Action</th>
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