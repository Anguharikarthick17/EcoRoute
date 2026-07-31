import { fetchApi } from "../utils/apiUtils";

export const rewardService = {
  async getMyRewards() {
    return await fetchApi("/rewards/my-rewards");
  },

  async awardPoints(userId, points, title) {
    return await fetchApi("/rewards/award", {
      method: "POST",
      body: JSON.stringify({ userId, points, title }),
    });
  },
};
