import { useQuery } from "@tanstack/react-query"
import { getMe } from "../../api/auth.api"

export const useCurrentUser = () => {
    return useQuery({
        queryKey: ["current-user"],
        queryFn: getMe,
        staleTime: 5 * 60 * 1000,
        retry: false
    })
}