

import useOverdue from '../../../hooks/useOverdue'
import PageTitle from '../../ui/pageTitle';
import TableHeader from '../../ui/table/tableHeader'
import LoadingComponent from '../../ui/loadingComponent'
import TableRow from '../../ui/table/tableRow';
import TableHead from '../../ui/table/tableHead';
import TableCell from '../../ui/table/tableCell';
import Table from '../../ui/table/table';
import PriorityBadge from '../../ui/table/priorityBadge';
import StatusBadge from '../../ui/table/statusBadge';
import EmptyTable from '../../ui/table/emptyTable';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui/button';


export default function OverdueTasks({ role }) {

    const { loading, error, overdue } = useOverdue(role);
    const navigate = useNavigate();
    if (loading) return <LoadingComponent />
    if (error) return <>{error}</>
    return (
        <div className=" flex-1 flex flex-col h-full border border-[#cbcbcb] rounded-2xl">
            <PageTitle title={'Overdue Tasks'} color={"text-[#4d1717]"} variant='Dashboard' />
            <div className='flex-1 min-h-0'>
                <Table variant='Dashboard'>
                    <TableHeader>
                        <TableRow>

                            <TableHead>Title</TableHead>
                            <TableHead>Audit Id</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Priority</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>Due Date</TableHead>

                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <tbody>
                        {overdue.length === 0 ? <EmptyTable /> :
                            overdue.map((task) => {
                                return (
                                    <TableRow key={task.id}>

                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.audit_id}</TableCell>

                                        <TableCell>{task.company}</TableCell>


                                        <TableCell><PriorityBadge priority={task.priority} /></TableCell>
                                        <TableCell><StatusBadge status={task.status} /></TableCell>
                                        <TableCell>{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</TableCell>


                                        <TableCell>
                                            <Button variant='Details' icon='Details' iconSize='Small' onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</Button></TableCell>
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