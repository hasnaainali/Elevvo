import React from "react";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Saman ",
    text: "TaskFlow completely changed how I organize my work!",
    border: "border-pink-500",
  },
  {
    name: "Alex Carey",
    text: "Super easy to use and perfect for managing team projects.",
    border: "border-yellow-500",
  },
  {
    name: "Tayyab",
    text: "I love the clean design and how intuitive everything feels.",
    border: "border-indigo-500",
  },
];

function Reviews() {
  return (
    <section className="py-16 px-6 text-center">
      <h3 className="text-3xl font-bold mb-10">What Our Users Say</h3>
      <div className="grid md:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className={`p-6 rounded-xl shadow-lg border-2 ${r.border} dark:bg-gray-800`}
          >
            <p className="italic text-gray-600 dark:text-gray-300">"{r.text}"</p>
            <h4 className="mt-4 font-semibold">- {r.name}</h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
