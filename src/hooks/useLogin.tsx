import { useState } from "react"
import useUserContext from "./useUserContext"

const useLogin = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dispatch } = useUserContext()
    
    const login = async (username:string, password:string) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username,
                password
            })
        })

        const data = await response.json()

        if(response.ok){
            localStorage.setItem('userFS', JSON.stringify(data))
            dispatch({type: "LOGIN", payload: data})
        }
        if(!response.ok){
            setError(data.error)
        }
        setIsLoading(false)
    }

    return { login, isLoading, error }
}

export default useLogin