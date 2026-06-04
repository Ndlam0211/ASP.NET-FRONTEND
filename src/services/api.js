import axios from "axios";

const BASE_URL = "https://localhost:7214";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Helper to determine if we should fall back to mock data
// If the API throws a network error (like connection refused on localhost or CORS issue),
// we will intercept and return mock data smoothly so the preview never crashes.
export const handleApiWithFallback = async (apiCall, fallbackData) => {
  try {
    const response = await apiCall();
    return response.data;
  } catch (error) {
    console.warn("API Call failed, falling back to local dataset. Error info:", error.message || error);
    // Return the fallback data in the same shape expected from the API
    return fallbackData;
  }
};
