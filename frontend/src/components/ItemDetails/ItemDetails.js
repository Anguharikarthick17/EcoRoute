import React from "react";

export function ItemDetails({ item, onClose }) {
  if (!item) return null;
  return (
    <div style={{ background: "white", padding: "1.5rem", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
      <button onClick={onClose} style={{ float: "right", border: "none", background: "none", cursor: "pointer" }}>✕</button>
      <h2>{item.deviceName}</h2>
      <p><strong>Category:</strong> {item.category}</p>
      <p><strong>Brand:</strong> {item.brand}</p>
      <p><strong>Condition:</strong> {item.condition}</p>
      <p><strong>Price:</strong> ₹{item.price}</p>
      <p><strong>Seller:</strong> {item.sellerName} ({item.sellerCity})</p>
    </div>
  );
}
