import useUserContext from "./useUserContext";

const useLogout = () => {
    const { dispatch } = useUserContext()

    const logout = () => {
        localStorage.removeItem('userFS')
        dispatch({type: 'LOGOUT'})
    }
    
    return { logout }
}
 
export default useLogout;