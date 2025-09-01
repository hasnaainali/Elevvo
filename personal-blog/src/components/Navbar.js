import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav
      className="sticky top-0 w-full shadow-md z-50 transition-colors duration-300"
      style={{ backgroundColor: "#2e304a", height: "80px" }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 h-full">
        
        <h2 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-500 text-transparent bg-clip-text">
          MyBlog
        </h2>

        <div className="flex items-center space-x-4">
          {["Home", "About", "Blog", "Contact"].map((btn) => (
            <button
              key={btn}
              className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-full hover:bg-emerald-500 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105"
            >
              {btn}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-4 p-3 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
