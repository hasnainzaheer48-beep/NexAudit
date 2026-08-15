export default function TableHead({ children }) {
    return (
        <th className="
         px-5
        py-4
        text-left
        text-xs
        font-bold
        uppercase
        tracking-wide
         text-gray-600
        ">
            {children}
        </th>
    )
}