export default function Table({
  data,
  headers,
}) {
  return (
    <>
      <table className="table-auto  rounded-md bg w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* <thead className="text-xs text-gray-700 uppercase  bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th scope="col" className="py-4 px-6" key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="bg-white border-b  text-ellipsis dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
              {row.getVisibleCells().map(cell => (
                <td className="py-4 px-7" key={cell.id}>
                  <div className="line-clamp-4 " title={cell.getValue()}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody> */}
      </table>
    </>
  )
}