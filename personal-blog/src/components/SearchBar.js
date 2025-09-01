import React from "react";

function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search posts..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        w-full md:w-64 px-4 py-2 rounded-full 
        border border-gray-300 dark:border-gray-600 
        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
        focus:outline-none focus:ring-2 focus:ring-emerald-500
        transition-all duration-300
        hover:border-emerald-500 hover:ring-emerald-500
        shadow-sm hover:shadow-md
      "
    />
  );
}

export default SearchBar;
