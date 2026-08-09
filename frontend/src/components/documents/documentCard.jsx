import api from '../../api/axios'

export default function DocumentCard({ document: doc }) {


    const handleOpen = async () => {
        const response = await api.get(`/api/documents/${doc.id}/open`,
            {
                responseType: "blob"
            }
        );
        const url = URL.createObjectURL(response.data);
        window.open(url, "_blank");
    }

    const hanldeDownload = async () => {

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



    return (
        <div className="bg-gray-200 shadow-lg p-2 rounded-lg flex flex-col w-full  ">
            <div className="text-md font-semibold ">{doc.original_name}</div>
            <div>{((doc.mime_type).split('/')[1]).toUpperCase()} • {((doc.file_size) / (1024 * 1024)).toFixed(2)} MB</div>
            <button className="border p-1 rounded-lg bg-white font-semibold mb-1" onClick={handleOpen}>Open</button>
            <button className="border p-1 rounded-lg bg-white font-semibold " onClick={hanldeDownload} >Download</button>

        </div>
    )
}