import API from "./axiosInstance.api";

/**
 * Upload image(s) to Cloudinary (Admin only - supports multi-upload)
 * @param {File|File[]|FileList} files - Image file(s) to upload
 */
export const uploadImage = (files) => {
  const formData = new FormData();
  if (Array.isArray(files) || (typeof FileList !== "undefined" && files instanceof FileList)) {
    Array.from(files).forEach((file) => formData.append("images", file));
  } else {
    formData.append("images", files);
  }
  return API.post("/upload", formData);
};
