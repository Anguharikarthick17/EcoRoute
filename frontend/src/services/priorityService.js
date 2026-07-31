import { fetchApi } from "../utils/apiUtils";

export const priorityService = {
  async getPriorityQueue() {
    return await fetchApi("/priority/queue");
  },

  async assignPriority(itemId, priorityLevel, reason) {
    return await fetchApi("/priority/assign", {
      method: "POST",
      body: JSON.stringify({ itemId, priorityLevel, reason }),
    });
  },
};
