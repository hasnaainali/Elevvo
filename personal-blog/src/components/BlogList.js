import React from "react";
import BlogCard from "./BlogCard";

function BlogList({ posts }) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300 text-2xl md:text-3xl font-semibold my-20">
        No posts found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default BlogList;
