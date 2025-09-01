import React from "react";
import "./Navbar.css";

export default function Navbar({ theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <div className="brand">Weather Dashboard</div>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
