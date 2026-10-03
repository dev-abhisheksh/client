import axios from "axios";

// Use VITE_API_BASE_URL, falling back directly to live Render backend in production
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://bethesda-backend.onrender.com/api"
    : "http://localhost:3000/api");

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // CRITICAL: Allows browser to send & receive HTTP-only cookies across origins
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: attach token from localStorage if available (backup for cross-site cookie restrictions)
API.interceptors.request.use((config) => {
  // If sending FormData (file uploads), let the browser set multipart/form-data with boundary
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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