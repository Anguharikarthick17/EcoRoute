import React from "react";
import { PriorityDisplay } from "../../components/PriorityDisplay/PriorityDisplay";

export function PriorityManagement() {
  const mockQueue = [
    { id: "p-1", itemId: "ew_101 (HP Laptop)", priorityLevel: "HIGH", reason: "Hazardous Lithium Battery" },
    { id: "p-2", itemId: "ew_103 (LG Refrigerator)", priorityLevel: "MEDIUM", reason: "Copper Coil Recycling" },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Hazardous & Priority E-Waste Management</h2>
      <PriorityDisplay items={mockQueue} />
    </div>
  );
}
