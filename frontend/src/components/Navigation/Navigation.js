import React from "react";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/items", label: "Item Management" },
    { path: "/rewards", label: "Reward History" },
    { path: "/priority", label: "Priority Queue" },
    { path: "/profile", label: "Profile" },
  ];

  return (
    <nav style={{ background: "#1e293b", padding: "0.75rem 2rem", display: "flex", gap: "1.5rem" }}>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            color: location.pathname === item.path ? "#38bdf8" : "#cbd5e1",
            textDecoration: "none",
            fontWeight: location.pathname === item.path ? "bold" : "normal",
          }}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
