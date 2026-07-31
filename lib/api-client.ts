/**
 * EcoRoute API Client — Frontend integration wrapper
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(endpoint, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || `API Error (${response.status})`);
  }

  return data;
}

// ── Convenience API Helpers ───────────────────────────────────

export const api = {
  // Auth
  login: (credentials: any) =>
    apiRequest("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
  register: (userData: any) =>
    apiRequest("/api/auth/register", { method: "POST", body: JSON.stringify(userData) }),
  logout: () => apiRequest("/api/auth/logout", { method: "POST" }),
  forgotPassword: (email: string) =>
    apiRequest("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),

  // User
  getProfile: () => apiRequest("/api/user/profile"),
  updateProfile: (profile: any) =>
    apiRequest("/api/user/profile", { method: "PUT", body: JSON.stringify(profile) }),

  // Pickups
  createPickup: (data: any) =>
    apiRequest("/api/pickup/create", { method: "POST", body: JSON.stringify(data) }),
  getPickupHistory: () => apiRequest("/api/pickup/history"),
  getPickupStatus: (id: string) => apiRequest(`/api/pickup/status?id=${id}`),

  // Centers
  getCenters: (city?: string) => apiRequest(`/api/centers?city=${city || ""}`),

  // AI
  classifyImage: (data: { imageUrl: string; deviceName?: string }) =>
    apiRequest("/api/ai/classify", { method: "POST", body: JSON.stringify(data) }),

  // Notifications, Rewards, Certificates
  getNotifications: () => apiRequest("/api/notifications"),
  getRewards: () => apiRequest("/api/rewards"),
  getCertificates: () => apiRequest("/api/certificates"),

  // Admin
  getAdminStats: () => apiRequest("/api/admin/dashboard"),
  getAdminUsers: () => apiRequest("/api/admin/users"),
  getAdminPickups: () => apiRequest("/api/admin/pickups"),

  // Officer
  getOfficerStats: () => apiRequest("/api/officer/dashboard"),
  assignDriver: (data: any) =>
    apiRequest("/api/officer/assign", { method: "POST", body: JSON.stringify(data) }),
};
