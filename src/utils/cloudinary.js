/**
 * Transforms a Cloudinary URL to automatically deliver optimal modern format (WebP/AVIF)
 * and dynamic intelligent compression (q_auto), reducing image load times by up to 80%.
 *
 * @param {string} url - The image source URL
 * @param {object} options - Optional transformations (width, height, quality, format)
 * @returns {string} - Optimized URL or original URL if not Cloudinary
 */
export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== 'string') return url;

  // Only apply to Cloudinary hosted images
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  const { quality = 'auto', format = 'auto', width, height, crop } = options;

  // If no custom dimensions requested and already transformed with f_auto/q_auto, return as-is
  if (!width && !height && !crop && (url.includes('/f_auto') || url.includes('/q_auto'))) {
    return url;
  }

  const transforms = [`f_${format}`, `q_${quality}`];
  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (crop) transforms.push(`c_${crop}`);

  const transformString = transforms.join(',');

  // If already has /upload/f_auto,q_auto/, replace it with full transform
  if (url.includes('/upload/f_auto,q_auto/')) {
    return url.replace('/upload/f_auto,q_auto/', `/upload/${transformString}/`);
  }

  return url.replace('/upload/', `/upload/${transformString}/`);
}
