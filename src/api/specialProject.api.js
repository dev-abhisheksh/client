import API from "./axiosInstance.api";

/**
 * Fetch all special projects
 */
export const getAllSpecialProjects = () => API.get("/special-projects");

/**
 * Upload a photo directly to special project gallery via Cloudinary (Admin only)
 * @param {string} id - Project ID or slug
 * @param {File} file - Image file
 */
export const uploadSpecialProjectPhoto = (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  return API.post(`/special-projects/${id}/photos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Delete a photo from special project gallery (Admin only)
 * @param {string} id - Project ID or slug
 * @param {string} photoId - Photo subdocument ID
 */
export const deleteSpecialProjectPhoto = (id, photoId) =>
  API.delete(`/special-projects/${id}/photos/${photoId}`);
