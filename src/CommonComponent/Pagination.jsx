import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, hasPrevPage, hasNextPage }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-2 py-4 gap-3">
      <div className="text-sm text-slate-500">
        Page <b>{currentPage}</b> of <b>{totalPages}</b>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={`px-3 py-1 text-sm rounded border ${
              num === currentPage
                ? "bg-slate-800 text-white border-slate-800 hover:bg-slate-700"
                : "text-slate-600 bg-white border-slate-300 hover:bg-slate-100"
            }`}
          >
            {num}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          className="px-3 py-1 text-sm text-slate-600 bg-white border border-slate-300 rounded hover:bg-slate-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;