interface TableProps {
  tableHeaders: string[];
  dataSource: any[];
  renderRow: (data: any) => React.ReactNode;
}

function Table({ tableHeaders, dataSource, renderRow }: TableProps) {
  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {tableHeaders.map((header) => (
              <th key={header} scope="col" className="px-6 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((data) => renderRow(data))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
