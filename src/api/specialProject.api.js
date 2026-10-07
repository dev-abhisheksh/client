import API from "./axiosInstance.api";

/**
 * Fetch all special projects
 */
export const getAllSpecialProjects = () => API.get("/special-projects");

/**
 * Upload photo(s) directly to special project gallery via Cloudinary (Admin only - supports multi-upload)
 * @param {string} id - Project ID or slug
 * @param {File|File[]|FileList} files - Single file or array/FileList of images
 */
export const uploadSpecialProjectPhoto = (id, files) => {
  const formData = new FormData();
  if (Array.isArray(files) || (typeof FileList !== "undefined" && files instanceof FileList)) {
    Array.from(files).forEach((file) => formData.append("images", file));
  } else {
    formData.append("images", files);
  }
  return API.post(`/special-projects/${id}/photos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Create a new special project (Admin only)
 * @param {object} projectData - { title, slug, badge, description, order }
 */
export const createSpecialProject = (projectData) =>
  API.post("/special-projects", projectData);

/**
 * Delete a photo from special project gallery (Admin only)
 * @param {string} id - Project ID or slug
 * @param {string} photoId - Photo subdocument ID
 */
export const deleteSpecialProjectPhoto = (id, photoId) =>
  API.delete(`/special-projects/${id}/photos/${photoId}`);

/**
 * Update special project details (Admin only)
 * @param {string} id - Project ID or slug
 * @param {object} projectData - Updated fields
 */
export const updateSpecialProject = (id, projectData) =>
  API.put(`/special-projects/${id}`, projectData);

/**
 * Delete a special project (Admin only)
 * @param {string} id - Project ID
 */
export const deleteSpecialProject = (id) =>
  API.delete(`/special-projects/${id}`);

