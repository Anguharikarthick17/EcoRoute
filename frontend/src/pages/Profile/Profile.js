import React from "react";

export function Profile({ user }) {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Citizen Profile</h2>
      <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
        <p><strong>Name:</strong> {user?.name || "Anguharikarthick"}</p>
        <p><strong>Email:</strong> {user?.email || "anguharikarthick@gmail.com"}</p>
        <p><strong>Role:</strong> {user?.role || "CITIZEN"}</p>
        <p><strong>CPCB ID:</strong> DL-2026-8941</p>
      </div>
    </div>
  );
}
