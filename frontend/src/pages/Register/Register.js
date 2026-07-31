import React, { useState } from "react";
import { authService } from "../../services/authService";

export function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(name, email, password);
      setMsg("Registration successful! Please login.");
    } catch (err) {
      setMsg(`Error: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto", padding: "2rem", background: "white", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
      <h2>Create Citizen / Recycler Account</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: "0.5rem" }} />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "0.5rem" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "0.5rem" }} />
        <button type="submit" style={{ padding: "0.75rem", background: "#003366", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Register</button>
      </form>
    </div>
  );
}
