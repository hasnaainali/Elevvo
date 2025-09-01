import React from "react";

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-10">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition transform hover:scale-105"
      >
        Prev
      </button>
      <span className="font-semibold text-gray-700 dark:text-gray-300">
        {currentPage} / {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="px-5 py-2 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 transition transform hover:scale-105"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
