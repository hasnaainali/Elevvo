import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="h-[40vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white">
      <motion.h1 
        className="text-6xl font-extrabold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Organize Your Tasks Effortlessly
      </motion.h1>

      <motion.p 
        className="text-xl mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Boost your productivity with TaskFlow
      </motion.p>

      <motion.button 
        className="px-6 py-3 bg-white text-emerald-600 font-semibold rounded-2xl shadow-lg hover:bg-gray-200 transition"
        whileHover={{ scale: 1.1, rotate: 2 }}
        whileTap={{ scale: 0.95 }}
      >
        Try TaskFlow Now
      </motion.button>
    </section>
  );
}
