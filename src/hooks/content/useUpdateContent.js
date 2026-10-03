import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateContentByKey } from "../../api/content.api";

export const useUpdateContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, data }) => updateContentByKey(key, data),
    onSuccess: (res, variables) => {
      // Immediately sync the React Query cache so the UI never displays stale cached data
      queryClient.setQueryData(['content', variables.key], (old) => {
        return {
          ...old,
          data: {
            success: true,
            key: variables.key,
            data: variables.data,
          },
        };
      });
      queryClient.invalidateQueries({ queryKey: ['content', variables.key] });
      queryClient.invalidateQueries({ queryKey: ['all-content'] });
    },
  });
};
