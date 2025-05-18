// import React from "react";
// import Pagination from "./Pagination";
// import Loader from "./Loader";

// const PaginatedTable = ({
//   columns,
//   data,
//   currentPage,
//   totalPages,
//   onPageChange,
//   hasPrevPage,
//   hasNextPage,
//   loading,
//   noDataMessage = "No data found.",
// }) => {
//   if (loading) {
//     return <Loader/>;
//   }

//   return (
//     <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
//         <thead className="bg-slate-200 text-slate-600 text-sm">
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index} className="py-3 px-4 border text-left">
//                 {col.header}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="text-slate-700">
//           {data.length > 0 ? (
//             data.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 className="border-b hover:bg-gray-50 transition"
//               >
//                 {columns.map((col, colIndex) => (
//                   <td key={colIndex} className="py-2 px-4 border">
//                     {col.render ? col.render(row) : row[col.accessor]}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan={columns.length}
//                 className="py-4 px-4 text-center text-slate-400"
//               >
//                 {noDataMessage}
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex justify-between items-center mt-4">
//         <div className="text-sm text-slate-500">
//           Showing page <b>{currentPage}</b> of <b>{totalPages}</b>
//         </div>
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={onPageChange}
//           hasPrevPage={hasPrevPage}
//           hasNextPage={hasNextPage}
//         />
//       </div>
//     </div>
//   );
// };

// export default PaginatedTable;


import React from "react";
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
  pageSize, // Add pageSize as a prop
  totalItems, // Add totalItems as a prop
}) => {
  if (loading) {
    return <Loader />;
  }

  // Calculate the range of items being displayed
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
        <thead className="bg-slate-200 text-slate-600 text-sm">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-3 px-4 border text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-slate-700">
          {data?.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-50 transition"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-2 px-4 border">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 px-4 text-center text-slate-400"
              >
                {noDataMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-slate-500">
          {data.length > 0 ? (
            <>
              Showing <b>{start}</b> to <b>{end}</b> of <b>{totalItems}</b> items
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