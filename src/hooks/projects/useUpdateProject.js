import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "../../api/project.api";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProject(id, data),
    onSuccess: (res, variables) => {
      const updatedProject = res?.data?.project;
      if (updatedProject) {
        queryClient.setQueryData(["projects"], (old) => {
          if (!old?.data?.projects) return old;
          return {
            ...old,
            data: {
              ...old.data,
              projects: old.data.projects.map((p) =>
                p._id === updatedProject._id ? { ...p, ...updatedProject } : p
              ),
            },
          };
        });
      }
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });
};
