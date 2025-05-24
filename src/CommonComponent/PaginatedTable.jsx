import Pagination from "./Pagination";
import Loader from "./Loader";

const PaginatedTable = ({
  columns,
  data,
  currentPage,
  totalPages,
  onPageChange,
  hasPrevPage,
  hasNextPage,
  loading,
  noDataMessage = "No data found.",
  pageSize,
  totalItems,
}) => {
  if (loading) return <Loader />;

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-md">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`px-6 py-4 text-left border-b border-gray-200 whitespace-nowrap ${
                  col.className || ""
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={row._id || rowIndex}
                className="hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-6 py-4 ${col.className || ""}`}
                  >
                    {col.render ? col.render(row, rowIndex) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-6 text-center text-gray-400"
              >
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 px-4 py-4 text-sm text-gray-500 border-t border-gray-200">
        <div>
          {data.length > 0 ? (
            <>
              Showing <span className="font-medium">{start}</span> to{" "}
              <span className="font-medium">{end}</span> of{" "}
              <span className="font-medium">{totalItems}</span> results
            </>
          ) : (
            "No data available"
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
};

export default PaginatedTable;
