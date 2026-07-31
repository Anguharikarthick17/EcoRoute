import { fetchApi } from "../utils/apiUtils";

export const authService = {
  async login(email, password) {
    const data = await fetchApi("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    if (data.data && data.data.token) {
      localStorage.setItem("ecoroute_token", data.data.token);
      localStorage.setItem("ecoroute_user", JSON.stringify(data.data.user));
    }
    return data;
  },

  async register(name, email, password, role = "CITIZEN") {
    return await fetchApi("/users/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, role }),
    });
  },

  async getProfile() {
    return await fetchApi("/users/profile");
  },

  logout() {
    localStorage.removeItem("ecoroute_token");
    localStorage.removeItem("ecoroute_user");
  },
};
