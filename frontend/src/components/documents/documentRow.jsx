import api from '../../api/axios'
import Button from '../ui/button';
import DocTypeBadge from '../ui/table/docTypeBadge';
import TableCell from '../ui/table/tableCell';
import TableRow from '../ui/table/tableRow';


export default function DocumentRow({ document: doc, onDelete }) {



    const handleOpen = async () => {
        const response = await api.get(`/api/documents/${doc.id}/open`,
            {
                responseType: "blob"
            }
        );
        const url = URL.createObjectURL(response.data);
        window.open(url, "_blank");
    }

    const handleDownload = async () => {

        try {
            const response = await api.get(`/api/documents/${doc.id}/download`,
                {
                    responseType: "blob"
                }
            )

            const url = URL.createObjectURL(response.data);
            const link = document.createElement("a");
            link.href = url;
            link.download = doc.original_name;
            link.click();
            URL.revokeObjectURL(url)

        }
        catch (error) {
            console.error(error);

        }

    }
    const handleDelete = async () => {
        try {
            await api.patch(`/api/documents/${doc.id}/delete`);
            onDelete(doc.id);
        }
        catch (error) {
            console.error(error);
        }
    }



    return (
        <TableRow key={doc.id}>
            <TableCell><span className='font-semibold'>{doc.original_name}</span></TableCell>
            <TableCell><DocTypeBadge type={doc.mime_type} /> </TableCell>
            <TableCell>{doc.uploaded_by_name}</TableCell>
            <TableCell>{new Date(doc.uploaded_at).toLocaleDateString()}</TableCell>
            <TableCell><span className='font-semibold'>{((doc.file_size) / (1024 * 1024)).toFixed(2)} MB</span></TableCell>
            <TableCell>
                <div className='flex gap-3'>
                    <Button onClick={handleOpen} variant='Details' icon='View' iconSize='Small' isChildren={false} />
                    <Button variant='Edit' icon='Download' iconSize='Small' onClick={handleDownload} isChildren={false} />
                    <Button onClick={handleDelete} variant='Archive/Deactivate' icon='Delete' iconSize='Smalll' isChildren={false} />
                </div>
            </TableCell>
        </TableRow>
    )
}