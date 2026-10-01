import API from "./axiosInstance.api";

/**
 * Log in admin user
 * @param {{ email: string, password: string }} credentials
 */
export const loginUser = (credentials) => API.post("/auth/login", credentials);

/**
 * Log out admin user (clears HTTP-only cookies)
 */
export const logoutUser = () => API.post("/auth/logout");

/**
 * Get currently authenticated admin user info from active session
 */
export const getMe = () => API.get("/auth/me");