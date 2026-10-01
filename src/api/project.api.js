import API from "./axiosInstance.api";

/**
 * Fetch all projects from database
 */
export const getAllProjects = () => API.get("/projects");

/**
 * Fetch a single project by ID
 * @param {string} id
 */
export const getProjectById = (id) => API.get(`/projects/${id}`);

/**
 * Create a new project (Admin only)
 * @param {object} projectData
 */
export const createProject = (projectData) => API.post("/projects", projectData);

/**
 * Update project details (Admin only)
 * @param {string} id
 * @param {object} projectData
 */
export const updateProject = (id, projectData) => API.put(`/projects/${id}`, projectData);

/**
 * Delete a project (Admin only)
 * @param {string} id
 */
export const deleteProject = (id) => API.delete(`/projects/${id}`);

/**
 * Upload a photo directly to project gallery via Cloudinary (Admin only)
 * @param {string} id - Project ID
 * @param {File} file - Image file
 */
export const uploadProjectPhoto = (id, file) => {
  const formData = new FormData();
  formData.append("image", file);
  return API.post(`/projects/${id}/photos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * Delete a photo from project gallery via Cloudinary (Admin only)
 * @param {string} id - Project ID
 * @param {string} photoId - Photo subdocument ID
 */
export const deleteProjectPhoto = (id, photoId) => API.delete(`/projects/${id}/photos/${photoId}`);


