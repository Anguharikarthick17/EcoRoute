import React from "react";
import { Link } from "react-router-dom";

export function Header({ user, onLogout }) {
  return (
    <header style={{ background: "#003366", color: "white", padding: "1rem 2rem", display: "flex", justifyBetween: "space-between", alignItems: "center" }}>
      <div style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>🌿 EcoRoute Portal</Link>
      </div>
      <div>
        {user ? (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <span>Welcome, <strong>{user.name}</strong></span>
            <button onClick={onLogout} style={{ padding: "0.4rem 0.8rem", borderRadius: "4px", border: "none", background: "#ef4444", color: "white", cursor: "pointer" }}>Logout</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link to="/login" style={{ color: "white" }}>Login</Link>
            <Link to="/register" style={{ color: "white" }}>Register</Link>
          </div>
        )}
      </div>
    </header>
  );
}
