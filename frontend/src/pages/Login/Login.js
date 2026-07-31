import React, { useState } from "react";
import { authService } from "../../services/authService";

export function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password);
      if (onLoginSuccess) onLoginSuccess(data.data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "3rem auto", padding: "2rem", background: "white", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
      <h2>Login to EcoRoute</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: "0.5rem" }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: "0.5rem" }} />
        <button type="submit" style={{ padding: "0.75rem", background: "#003366", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>Login</button>
      </form>
    </div>
  );
}
