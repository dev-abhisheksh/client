import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getHero,
  updateHero,
  uploadHeroPhoto,
  deleteHeroPhoto,
} from '../../api/hero.api';
import { useAuth } from '../../context/AuthContext';

/**
 * Custom hook to manage isolated hero media (carousel / static cover) per page.
 * Uses dedicated backend endpoints: GET /api/hero/:page, PUT /api/hero/:page, etc.
 *
 * @param {string} pageKey - e.g. 'home', 'about', 'projects', 'involved', 'donate', 'contact'
 * @param {Array<string>} defaultPhotos - fallback photos if none uploaded yet
 */
export function usePageHero(pageKey, defaultPhotos = []) {
  const page = pageKey.toLowerCase();
  const queryClient = useQueryClient();
  const { isAdmin } = useAuth();

  // Fetch page hero from dedicated backend /api/hero/:page
  const { data: remoteRes, isLoading } = useQuery({
    queryKey: ['hero', page],
    queryFn: () => getHero(page),
    staleTime: 15 * 1000,
  });

  const heroData = remoteRes?.data?.hero;

  const [photos, setPhotos] = useState(defaultPhotos);
  const [mediaMode, setMediaMode] = useState('carousel');
  const [activeIndex, setActiveIndex] = useState(0);

  // Sync state whenever backend data arrives or updates
  useEffect(() => {
    if (heroData) {
      if (Array.isArray(heroData.photos)) {
        setPhotos(heroData.photos);
      }
      if (heroData.mediaMode) {
        setMediaMode(heroData.mediaMode);
      }
      if (typeof heroData.activeIndex === 'number') {
        setActiveIndex(heroData.activeIndex);
      }
    }
  }, [heroData]);

  // Mutations with automatic React Query cache update
  const updateMutation = useMutation({
    mutationFn: (payload) => updateHero(page, payload),
    onSuccess: (res) => {
      queryClient.setQueryData(['hero', page], res);
      queryClient.invalidateQueries({ queryKey: ['hero', page] });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (fileOrFiles) => uploadHeroPhoto(page, fileOrFiles),
    onSuccess: (res) => {
      queryClient.setQueryData(['hero', page], res);
      queryClient.invalidateQueries({ queryKey: ['hero', page] });
    },
    onError: (err) => {
      alert('Failed to upload image(s): ' + (err.response?.data?.message || err.message));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (photoId) => deleteHeroPhoto(page, photoId),
    onSuccess: (res) => {
      queryClient.setQueryData(['hero', page], res);
      queryClient.invalidateQueries({ queryKey: ['hero', page] });
    },
    onError: (err) => {
      alert('Failed to delete photo: ' + (err.response?.data?.message || err.message));
    },
  });

  const handleToggleMediaMode = (newMode) => {
    setMediaMode(newMode);
    updateMutation.mutate({ mediaMode: newMode });
  };

  const handleSelectCoverPhoto = (idx) => {
    setActiveIndex(idx);
    updateMutation.mutate({ activeIndex: idx });
  };

  const handleUploadPhoto = (fileOrFiles) => {
    if (!fileOrFiles) return;
    uploadMutation.mutate(fileOrFiles);
  };

  const handleDeletePhoto = (idx) => {
    if (!window.confirm('Are you sure you want to remove this photo from the hero?')) return;
    const target = photos[idx];
    const photoId = target?._id || target?.publicId || target?.url || target;
    if (photoId) {
      deleteMutation.mutate(photoId);
    }
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
    isSaving: updateMutation.isPending,
    isUploading: uploadMutation.isPending,
    hasPhotos: photos.length > 0,
    isLoading,
  };
}
