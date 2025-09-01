import React from "react";
import { Facebook, Twitter, Instagram, Github } from "lucide-react";

function Footer() {
  return (
    <footer
      className="py-8 mt-12"
      style={{ backgroundColor: "#2e304a", color: "#cfd3e0" }}
    >
      <div className="container mx-auto text-center space-y-4">
        {/* Social Icons */}
        <div className="flex justify-center gap-6">
          <a href="/" className="hover:text-emerald-400 transition">
            <Facebook size={22} />
          </a>
          <a href="/" className="hover:text-emerald-400 transition">
            <Twitter size={22} />
          </a>
          <a href="/" className="hover:text-emerald-400 transition">
            <Instagram size={22} />
          </a>
          <a href="/" className="hover:text-emerald-400 transition">
            <Github size={22} />
          </a>
        </div>

        <p className="text-sm" style={{ color: "#cfd3e0" }}>
          © 2025 MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
