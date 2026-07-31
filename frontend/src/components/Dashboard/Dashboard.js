import React from "react";

export function Dashboard({ stats }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", margin: "1.5rem 0" }}>
      <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>Total Pickups</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0 0", color: "#0f172a" }}>{stats?.pickups || 14}</p>
      </div>
      <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>Green Points</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0 0", color: "#16a34a" }}>{stats?.points || 450}</p>
      </div>
      <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.875rem" }}>CO₂ Offset</h3>
        <p style={{ fontSize: "2rem", fontWeight: "bold", margin: "0.5rem 0 0", color: "#2563eb" }}>{stats?.co2 || "142 kg"}</p>
      </div>
    </div>
  );
}
