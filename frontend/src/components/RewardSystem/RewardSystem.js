import React from "react";

export function RewardSystem({ points = 450 }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #065f46, #047857)", color: "white", padding: "1.5rem", borderRadius: "12px" }}>
      <h3 style={{ margin: 0 }}>Green Coins Balance: {points} Coins</h3>
      <p style={{ margin: "0.5rem 0 0", fontSize: "0.85rem", opacity: 0.9 }}>1 Green Coin = ₹1 Value on Electricity / Water Bills & Cash Payouts</p>
    </div>
  );
}
