import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Users } from "lucide-react";

const features = [
  { icon: <CheckCircle size={40} className="text-emerald-500" />, title: "Easy Task Management", desc: "Organize your daily to-dos with just a few clicks." },
  { icon: <Clock size={40} className="text-teal-500" />, title: "Stay On Time", desc: "Never miss deadlines with smart reminders." },
  { icon: <Users size={40} className="text-cyan-500" />, title: "Team Collaboration", desc: "Work together with your team seamlessly." },
];

export default function Features() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 text-center">
      <motion.h2 
        className="text-4xl font-bold mb-10 dark:text-white"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Features
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {features.map((f, i) => (
          <motion.div 
            key={i} 
            className="p-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md hover:shadow-2xl transition"
            whileHover={{ scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{f.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
