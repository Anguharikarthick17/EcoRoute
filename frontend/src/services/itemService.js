import { fetchApi } from "../utils/apiUtils";

export const itemService = {
  async getItems() {
    return await fetchApi("/items");
  },

  async getItemById(id) {
    return await fetchApi(`/items/${id}`);
  },

  async createItem(itemData) {
    return await fetchApi("/items", {
      method: "POST",
      body: JSON.stringify(itemData),
    });
  },

  async purchaseItem(id) {
    return await fetchApi(`/items/${id}/purchase`, {
      method: "POST",
    });
  },
};
