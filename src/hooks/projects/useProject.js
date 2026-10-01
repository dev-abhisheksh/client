import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "../../api/project.api";

export const useProject = (id) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
