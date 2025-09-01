import React from "react";

function CategoryFilter({ category, setCategory }) {
  const categories = ["All", "Tech", "Travel", "Food"];

  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition 
            ${
              category === cat
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
