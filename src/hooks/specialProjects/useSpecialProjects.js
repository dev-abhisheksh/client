import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSpecialProjects,
  createSpecialProject,
  updateSpecialProject,
  deleteSpecialProject,
  uploadSpecialProjectPhoto,
  deleteSpecialProjectPhoto,
} from "../../api/specialProject.api";

export const useSpecialProjects = () => {
  return useQuery({
    queryKey: ["special-projects"],
    queryFn: getAllSpecialProjects,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: true,
  });
};

export const useCreateSpecialProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectData) => createSpecialProject(projectData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-projects"] });
    },
  });
};

export const useUpdateSpecialProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateSpecialProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-projects"] });
    },
  });
};

export const useDeleteSpecialProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteSpecialProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-projects"] });
    },
  });
};

export const useUploadSpecialProjectPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file, files }) => uploadSpecialProjectPhoto(id, files || file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-projects"] });
    },
  });
};

export const useDeleteSpecialProjectPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, photoId }) => deleteSpecialProjectPhoto(id, photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["special-projects"] });
    },
  });
};
