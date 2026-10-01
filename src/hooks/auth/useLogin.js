import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../../api/auth.api"

export const useLogin = ()=>{
    return useMutation({
        mutationFn: loginUser,
        onSuccess: (res)
    })
}