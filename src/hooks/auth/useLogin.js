import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../api/auth.api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials) => loginUser(credentials),
    onSuccess: (res) => {
      queryClient.setQueryData(["current-user"], res);
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    },
  });
};