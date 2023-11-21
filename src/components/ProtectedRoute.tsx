import useUserContext from "../hooks/useUserContext"
import { Navigate } from 'react-router-dom'

type Props = {
    children: React.ReactNode
    path: string
    allow?: boolean
}

const ProtectedRoute = ({children, path, allow}:Props) => {
    const { user } = useUserContext()
    
    if((user && !allow) || (!user && allow)){
        return <Navigate to={path} replace/>
    }
    
    return children
}
 
export default ProtectedRoute;