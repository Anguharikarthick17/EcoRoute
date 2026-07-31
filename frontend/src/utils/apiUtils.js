const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export async function fetchApi(endpoint, options = {}) {
  const token = localStorage.getItem("ecoroute_token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "API request failed");
  }
  return data;
}
