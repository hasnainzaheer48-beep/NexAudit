import api from '../../../api/axios'
import useOverdue from '../../../hooks/useOverdue'
import Table from '../../ui/table/table';
import TableHeader from '../../ui/table/tableHeader'
import TableHead from '../../ui/table/tableHead'
import TableRow from '../../ui/table/tableRow';
import TableCell from '../../ui/table/tableCell';

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

                        <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Client Id</TableHead>
                            <TableHead>Template Id</TableHead>



                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>

                            <TableHead>Action</TableHead>
                        </TableRow>

                    </TableHeader>
                    <tbody>
                        {
                            overdue.map((audit) => {
                                return (
                                    <TableRow key={audit.id}>
                                        <TableCell >{audit.id}</TableCell>
                                        <TableCell >{audit.client}</TableCell>
                                        <TableCell >{audit.template}</TableCell>


                                        <TableCell >{audit.priority}</TableCell>
                                        <TableCell >{audit.status}</TableCell>



                                        <TableCell >

                                            <button className="border px-2 mr-1" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}