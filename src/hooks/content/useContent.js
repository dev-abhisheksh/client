import { useQuery } from "@tanstack/react-query";
import { getContentByKey } from "../../api/content.api";

export const useContent = (key) => {
  return useQuery({
    queryKey: ["content", key],
    queryFn: () => getContentByKey(key),
    enabled: !!key,
    staleTime: 15 * 1000,
    refetchOnWindowFocus: true,
    retry: 1,
  });
};
