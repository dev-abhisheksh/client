import { useQuery } from "@tanstack/react-query";
import { getContentByKey } from "../../api/content.api";

export const useContent = (key) => {
  return useQuery({
    queryKey: ["content", key],
    queryFn: () => getContentByKey(key),
    enabled: !!key,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
