import React, { useEffect, useState } from "react";
import { Dashboard } from "../../components/Dashboard/Dashboard";
import { ItemList } from "../../components/ItemList/ItemList";
import { itemService } from "../../services/itemService";

export function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    itemService.getItems().then((res) => {
      if (res.data) setItems(res.data);
    }).catch(() => {});
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Dashboard Overview</h2>
      <Dashboard />
      <h3 style={{ marginTop: "2rem" }}>Available E-Waste Scrap Items</h3>
      <ItemList items={items} />
    </div>
  );
}
