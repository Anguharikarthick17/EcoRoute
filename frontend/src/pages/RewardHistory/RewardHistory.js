import React from "react";
import { RewardSystem } from "../../components/RewardSystem/RewardSystem";

export function RewardHistory() {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Reward History & Green Coins</h2>
      <RewardSystem points={450} />
    </div>
  );
}
