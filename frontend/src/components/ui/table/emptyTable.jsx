export default function EmptyTable({ message }) {
    return (
        <tr>
            <td colSpan="100%"
                className="
                text-center
                py-12
                text-gray-500
                ">
                {message}
            </td>
        </tr>
    )
}