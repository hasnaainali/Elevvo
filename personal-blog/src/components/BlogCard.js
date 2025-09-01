import React from "react";

function BlogCard({ post }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-2 overflow-hidden">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <span className="inline-block mb-2 px-3 py-1 text-sm rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-700 dark:text-emerald-200">
          {post.category}
        </span>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          {post.date}
        </p>
        <p className="text-gray-600 dark:text-gray-300">{post.description}</p>
      </div>
    </div>
  );
}

export default BlogCard;
