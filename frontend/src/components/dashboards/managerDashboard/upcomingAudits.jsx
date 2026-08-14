import api from '../../../api/axios'
import useUpcoming from '../../../hooks/useUpcoming'
import PageTitle from '../../ui/pageTitle';
import EmptyTable from '../../ui/table/emptyTable';
import PriorityBadge from '../../ui/table/priorityBadge';
import StatusBadge from '../../ui/table/statusBadge';
import Table from '../../ui/table/table';
import TableCell from '../../ui/table/tableCell';
import TableHead from '../../ui/table/tableHead';
import TableHeader from '../../ui/table/tableHeader';
import TableRow from '../../ui/table/tableRow';

export default function UpcomingAudits({ role }) {

    const { loading, error, upcoming } = useUpcoming(role);
    if (loading) return <>loading</>
    if (error) return <>{error}</>
    return (
        <div className="flex flex-col w-full border h-full border-[#cbcbcb] rounded-2xl">
            <PageTitle title={"Upcoming Audits"} variant='Dashboard' />
            <div className='flex-1 min-h-0'>
                <Table variant='Dashboard'>
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
                        {upcoming.length === 0 ? <EmptyTable message={"No Upcoming Audits"} /> :
                            upcoming.map((audit) => {
                                return (
                                    <TableRow key={audit.id}>
                                        <TableCell>{audit.id}</TableCell>
                                        <TableCell>{audit.client}</TableCell>
                                        <TableCell>{audit.template}</TableCell>


                                        <TableCell><PriorityBadge priority={audit.priority} /></TableCell>
                                        <TableCell>< StatusBadge status={audit.status} /></TableCell>



                                        <TableCell>

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