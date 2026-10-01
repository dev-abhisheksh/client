import { useQuery } from "@tanstack/react-query";
import { getAllProjects } from "../../api/project.api";

export const useProjects = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
    staleTime: 10 * 1000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
