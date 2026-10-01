import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../api/project.api";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
