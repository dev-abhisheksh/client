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
 * Upload photo(s) directly to project gallery via Cloudinary (Admin only - supports multi-upload)
 * @param {string} id - Project ID
 * @param {File|File[]|FileList} files - Single file or array/FileList of images
 */
export const uploadProjectPhoto = (id, files) => {
  const formData = new FormData();
  if (Array.isArray(files) || (typeof FileList !== "undefined" && files instanceof FileList)) {
    Array.from(files).forEach((file) => formData.append("images", file));
  } else {
    formData.append("images", files);
  }
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


