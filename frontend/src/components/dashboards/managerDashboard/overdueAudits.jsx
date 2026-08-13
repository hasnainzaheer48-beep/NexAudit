import api from '../../../api/axios'
import useOverdue from '../../../hooks/useOverdue'
import Table from '../../ui/table/table';
import TableHeader from '../../ui/table/tableHeader'
import TableHead from '../../ui/table/tableHead'
import TableRow from '../../ui/table/tableRow';
import TableCell from '../../ui/table/tableCell';
import StatusBadge from '../../ui/table/statusBadge';
import EmptyTable from '../../ui/table/emptyTable';
import { useNavigate } from 'react-router-dom'

export default function OverdueAudits({ role }) {

    const { loading, error, overdue } = useOverdue(role);
    const navigate = useNavigate();
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className="bg-gray-50 flex-1 h-full flex flex-col">
            <div className='text-center tracking-wider text-xl py-2 mb-3 bg-[#982c2c] text-white rounded-2xl '>
                Overdue Audits
            </div>
            <div className='flex-1 min-h-0'>
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
                        {overdue.length === 0 ? (<EmptyTable message={'No Overdue Audits'} />) : (

                            overdue.map((audit) => {
                                return (
                                    <TableRow key={audit.id}>
                                        <TableCell >{audit.id}</TableCell>
                                        <TableCell >{audit.client}</TableCell>
                                        <TableCell >{audit.template}</TableCell>


                                        <TableCell >{audit.priority}</TableCell>
                                        <TableCell > <StatusBadge status={audit.status} /></TableCell>



                                        <TableCell >

                                            <button className="border px-2 mr-1" onClick={() => { navigate(`/audits/audit-details/${audit.id}`) }}>Details</button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}