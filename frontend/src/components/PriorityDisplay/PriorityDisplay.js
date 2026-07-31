import React from "react";

export function PriorityDisplay({ items = [] }) {
  return (
    <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}>
      <h3>High Priority Recycling Queue</h3>
      {items.length === 0 ? (
        <p style={{ color: "#64748b", fontSize: "0.85rem" }}>No items currently in priority queue.</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <strong>{item.itemId}</strong> — Priority: <span style={{ color: "red" }}>{item.priorityLevel}</span> ({item.reason})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
