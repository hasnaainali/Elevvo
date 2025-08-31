import React from "react";
import { Facebook, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-center">
      <p className="mb-4">© 2025 TaskFlow. All rights reserved.</p>
      <div className="flex justify-center gap-6">
        <a href="#" className="hover:text-white"><Facebook /></a>
        <a href="#" className="hover:text-white"><Twitter /></a>
        <a href="#" className="hover:text-white"><Linkedin /></a>
      </div>
    </footer>
  );
}
