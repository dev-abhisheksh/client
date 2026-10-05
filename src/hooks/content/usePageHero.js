import { useState, useEffect } from 'react';
import { useContent } from './useContent';
import { useUpdateContent } from './useUpdateContent';
import { uploadImage } from '../../api/upload.api';
import { useAuth } from '../../context/AuthContext';

/**
 * Custom hook to manage isolated hero media (carousel / static cover) per page.
 * Persists data to MongoDB under `hero_${pageKey}` via useContent & useUpdateContent.
 *
 * @param {string} pageKey - Unique identifier for the page ('home', 'about', 'projects', 'involved', 'donate', 'contact')
 * @param {Array<string>} defaultPhotos - Optional initial photos for this page
 */
export function usePageHero(pageKey, defaultPhotos = []) {
  const sectionKey = `hero_${pageKey.toLowerCase()}`;
  const { data: remoteData } = useContent(sectionKey);
  const updateContentMutation = useUpdateContent();
  const { isAdmin } = useAuth();

  const getInitial = () => {
    try {
      const saved = localStorage.getItem(`bethesda_hero_${pageKey.toLowerCase()}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          photos: Array.isArray(parsed.photos) ? parsed.photos : defaultPhotos,
          mediaMode: parsed.mediaMode || 'carousel',
          activeIndex: typeof parsed.activeIndex === 'number' ? parsed.activeIndex : 0,
        };
      }
    } catch (e) {}
    return {
      photos: defaultPhotos,
      mediaMode: 'carousel',
      activeIndex: 0,
    };
  };

  const initial = getInitial();
  const [photos, setPhotos] = useState(initial.photos);
  const [mediaMode, setMediaMode] = useState(initial.mediaMode);
  const [activeIndex, setActiveIndex] = useState(initial.activeIndex);
  const [isUploading, setIsUploading] = useState(false);

  // Sync state if remote database has custom hero configuration for this page
  useEffect(() => {
    const raw = remoteData?.data;
    const serverPayload = raw?.data || (raw?.photos ? raw : null);
    if (serverPayload) {
      if (Array.isArray(serverPayload.photos)) {
        setPhotos(serverPayload.photos);
      }
      if (serverPayload.mediaMode) {
        setMediaMode(serverPayload.mediaMode);
      }
      if (typeof serverPayload.activeIndex === 'number') {
        setActiveIndex(serverPayload.activeIndex);
      }
    }
  }, [remoteData]);

  // Persist helper to MongoDB & localStorage
  const persistChanges = (newPayload) => {
    const combined = {
      photos,
      mediaMode,
      activeIndex,
      ...newPayload,
    };

    try {
      localStorage.setItem(`bethesda_hero_${pageKey.toLowerCase()}`, JSON.stringify(combined));
    } catch (e) {}

    updateContentMutation.mutate(
      { key: sectionKey, data: combined },
      {
        onError: (err) => {
          console.warn(`Failed to sync hero for ${pageKey} to server:`, err);
        },
      }
    );
  };

  const handleToggleMediaMode = (newMode) => {
    setMediaMode(newMode);
    persistChanges({ mediaMode: newMode });
  };

  const handleSelectCoverPhoto = (idx) => {
    setActiveIndex(idx);
    if (idx === 0 || photos.length <= idx) {
      persistChanges({ activeIndex: idx });
      return;
    }
    // Reorder so selected photo becomes primary cover (index 0)
    const selected = photos[idx];
    const remaining = photos.filter((_, i) => i !== idx);
    const updated = [selected, ...remaining];
    setPhotos(updated);
    setActiveIndex(0);
    persistChanges({ photos: updated, activeIndex: 0 });
  };

  const handleUploadPhoto = async (file) => {
    if (!file) return;
    try {
      setIsUploading(true);
      const res = await uploadImage(file);
      const newUrl = res.data?.image?.url || res.data?.url;
      if (!newUrl) throw new Error('Upload succeeded but no image URL was returned.');

      const updated = [...photos, newUrl];
      setPhotos(updated);
      persistChanges({ photos: updated });
    } catch (err) {
      alert('Failed to upload image: ' + (err.response?.data?.message || err.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePhoto = (idx) => {
    if (!window.confirm('Are you sure you want to remove this image from this hero section?')) return;
    const updated = photos.filter((_, i) => i !== idx);
    setPhotos(updated);
    const newActive = activeIndex >= updated.length ? Math.max(0, updated.length - 1) : activeIndex;
    setActiveIndex(newActive);
    persistChanges({ photos: updated, activeIndex: newActive });
  };

  return {
    photos,
    mediaMode,
    activeIndex,
    setActiveIndex,
    handleToggleMediaMode,
    handleSelectCoverPhoto,
    handleUploadPhoto,
    handleDeletePhoto,
    isAdmin,
    isSaving: updateContentMutation.isPending,
    isUploading,
    hasPhotos: photos.length > 0,
  };
}
