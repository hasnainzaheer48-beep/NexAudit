import api from '../../api/axios'

export default function DocumentCard({ document }) {


    const handleOpen = async () => {
        const response = await api.get(`/api/documents/${document.id}/open`,
            {
                responseType: "blob"
            }
        );
        const url = URL.createObjectURL(response.data);
        window.open(url, "_blank");
    }

    return (
        <div className="bg-gray-200 shadow-lg p-2 rounded-lg flex flex-col w-full  ">
            <div className="text-md font-semibold ">{document.original_name}</div>
            <div>{((document.mime_type).split('/')[1]).toUpperCase()} • {((document.file_size) / (1024 * 1024)).toFixed(2)} MB</div>
            <button className="border p-1 rounded-lg bg-white font-semibold mb-1" onClick={handleOpen}>Open</button>
            <button className="border p-1 rounded-lg bg-white font-semibold " >Download</button>

        </div>
    )
}