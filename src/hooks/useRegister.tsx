import { useState } from "react"
import useUserContext from "./useUserContext"

const useRegister = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { dispatch } = useUserContext()

    const register = async (username:string, password:string, avatar: File | undefined) => {
        setIsLoading(true)
        setError(null)

        const formData = new FormData()
        formData.append('username', username)
        formData.append('password', password)
        formData.append('avatar', avatar || '')

        const response = await fetch(`${import.meta.env.VITE_SERVER_API}/users/register`, {
            method: "POST",
            body: formData
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

    return { register, isLoading, error }
}
 
export default useRegister;