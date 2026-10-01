import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContentByKey } from "../../api/content.api";

export const useUpdateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, data }) => updateContentByKey(key, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: ["content", variables.key] });
      queryClient.invalidateQueries({ queryKey: ["all-content"] });
    },
  });
};
