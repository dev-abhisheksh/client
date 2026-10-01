import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true, // CRITICAL: Allows browser to send & receive HTTP-only cookies across origins
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for consistent error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // If request failed with ApiError response, preserve server message
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  }
);

export default API;