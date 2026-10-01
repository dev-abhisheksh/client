import API from "./axiosInstance.api";

/**
 * Fetch all CMS sections
 */
export const getAllContent = () => API.get("/content");

/**
 * Fetch a specific section by key (e.g., 'home', 'about', 'contact')
 * @param {string} key
 */
export const getContentByKey = (key) => API.get(`/content/${key.toLowerCase()}`);

/**
 * Update or create (upsert) section content (Admin only)
 * @param {string} key
 * @param {object} data
 */
export const updateContentByKey = (key, data) =>
  API.put(`/content/${key.toLowerCase()}`, { data });

/**
 * Delete a content section by key (Admin only)
 * @param {string} key
 */
export const deleteContentByKey = (key) =>
  API.delete(`/content/${key.toLowerCase()}`);
