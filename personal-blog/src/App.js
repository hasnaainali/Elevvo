import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BlogList from "./components/BlogList";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import blogData from "./data/blogData";

function App() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [theme, setTheme] = useState("light");
  const postsPerPage = 6;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const filteredByCategory =
    category === "All"
      ? blogData
      : blogData.filter((post) => post.category === category);

  const filteredPosts = filteredByCategory.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const start = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(start, start + postsPerPage);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="flex-1 container mx-auto px-4 py-10">
        <h1 class="text-4xl md:text-5xl font-extrabold text-center h-24 md:h-20 bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent animate-pulse">
          Welcome to My Blog
        </h1>
        <div class="w-full h-1 bg-emerald-400 mt-0 mb-6 rounded"></div>



        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <CategoryFilter category={category} setCategory={setCategory} />
          <SearchBar search={search} setSearch={setSearch} />
        </div>

        <BlogList posts={currentPosts} />

        {filteredPosts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
