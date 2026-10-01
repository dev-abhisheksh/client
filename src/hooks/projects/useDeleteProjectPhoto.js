import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjectPhoto } from "../../api/project.api";

export const useDeleteProjectPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, photoId }) => deleteProjectPhoto(id, photoId),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });
};
