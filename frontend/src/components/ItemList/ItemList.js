import React from "react";

export function ItemList({ items, onSelect }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.5rem" }}>
      {items.map((item) => (
        <div key={item.id} style={{ background: "white", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
          <h4 style={{ margin: "0 0 0.5rem", color: "#0f172a" }}>{item.deviceName}</h4>
          <p style={{ margin: "0 0 0.5rem", fontSize: "0.85rem", color: "#64748b" }}>{item.category} • {item.brand}</p>
          <p style={{ margin: "0 0 1rem", fontWeight: "bold", color: "#16a34a" }}>₹{item.price}</p>
          <button onClick={() => onSelect && onSelect(item)} style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "none", background: "#003366", color: "white", cursor: "pointer" }}>View Details</button>
        </div>
      ))}
    </div>
  );
}
