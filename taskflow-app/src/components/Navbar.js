import React from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav 
      className="sticky top-0 shadow-md p-4 flex justify-between items-center z-50"
      style={{ backgroundColor: "#20232A" }} 
    >
      <motion.h1 
        className="text-3xl font-extrabold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        TaskFlow
      </motion.h1>

      <div className="flex items-center gap-4">
        <motion.button 
          className="px-4 py-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started
        </motion.button>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 hover:scale-110 transition"
        >
          {darkMode ? <Sun className="text-yellow-400" /> : <Moon className="text-gray-800" />}
        </button>
      </div>
    </nav>
  );
}
