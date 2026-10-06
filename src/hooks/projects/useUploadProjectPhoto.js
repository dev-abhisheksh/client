import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadProjectPhoto } from "../../api/project.api";

export const useUploadProjectPhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, file, files }) => uploadProjectPhoto(id, files || file),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
    },
  });
};
