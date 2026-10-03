import API from "./axiosInstance.api";

/**
 * Upload a single image to Cloudinary (Admin only)
 * @param {File} file - Image file to upload
 */
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file);
  return API.post("/upload", formData);
};
