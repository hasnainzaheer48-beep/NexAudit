import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios'
import useUpcoming from '../../../hooks/useUpcoming'
import LoadingComponent from '../../ui/loadingComponent';
import PageTitle from '../../ui/pageTitle';
import EmptyTable from '../../ui/table/emptyTable';
import Table from '../../ui/table/table';
import TableCell from '../../ui/table/tableCell';
import TableHead from '../../ui/table/tableHead';
import TableHeader from '../../ui/table/tableHeader';
import TableRow from '../../ui/table/tableRow';

export default function UpcomingAudits({ role }) {

    const navigate = useNavigate();
    const { loading, error, upcoming } = useUpcoming(role);
    if (loading) return <LoadingComponent />
    if (error) return <>{error}</>
    return (
        <div className='flex flex-col h-full'>
            <PageTitle title={"Upcoming Tasks"} />
            <div className='flex-1 min-h-0'>
                <Table >
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
                        {upcoming.length === 0 ? <EmptyTable message={'No Upcoming Tasks'} /> :
                            upcoming.map((task) => {
                                return (
                                    <TableRow key={task.id}>

                                        <TableCell>{task.title}</TableCell>
                                        <TableCell>{task.audit_id}</TableCell>

                                        <TableCell>{task.company}</TableCell>


                                        <TableCell>{task.priority}</TableCell>
                                        <TableCell>{task.status}</TableCell>
                                        <TableCell>{task.start_date ? new Date(task.start_date).toLocaleDateString() : 'Null'}</TableCell>
                                        <TableCell>{task.due_date ? new Date(task.due_date).toLocaleDateString() : 'Null'}</TableCell>


                                        <TableCell>
                                            <button className="border px-2 mr-1" onClick={() => navigate(`/tasks/task-details/${task.id}`)}>View</button></TableCell>
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