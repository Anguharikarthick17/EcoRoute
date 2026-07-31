import React, { useState, useEffect } from "react";
import { ItemList } from "../../components/ItemList/ItemList";
import { ItemDetails } from "../../components/ItemDetails/ItemDetails";
import { itemService } from "../../services/itemService";

export function ItemManagement() {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    itemService.getItems().then((res) => {
      if (res.data) setItems(res.data);
    }).catch(() => {});
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>E-Waste Item Management</h2>
      {selectedItem ? (
        <ItemDetails item={selectedItem} onClose={() => setSelectedItem(null)} />
      ) : (
        <ItemList items={items} onSelect={(item) => setSelectedItem(item)} />
      )}
    </div>
  );
}
