import API from './axiosInstance.api';

/**
 * Fetch hero carousel settings & photos for a page
 * @param {string} page - 'home', 'about', 'projects', 'involved', 'donate', 'contact'
 */
export const getHero = (page) => API.get(`/hero/${page.toLowerCase()}`);

/**
 * Update hero mode or settings (Admin only)
 * @param {string} page
 * @param {object} data - { mediaMode, activeIndex }
 */
export const updateHero = (page, data) =>
  API.put(`/hero/${page.toLowerCase()}`, data);

/**
 * Upload a photo directly to page's hero carousel (Admin only)
 * @param {string} page
 * @param {File} file
 */
export const uploadHeroPhoto = (page, file) => {
  const formData = new FormData();
  formData.append('image', file);
  return API.post(`/hero/${page.toLowerCase()}/photos`, formData);
};

/**
 * Delete a photo from page's hero carousel (Admin only)
 * @param {string} page
 * @param {string} photoId
 */
export const deleteHeroPhoto = (page, photoId) =>
  API.delete(`/hero/${page.toLowerCase()}/photos/${photoId}`);
