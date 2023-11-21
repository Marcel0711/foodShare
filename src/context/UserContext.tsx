import { createContext, useEffect, useReducer } from "react";
import type { UserActions, UserState, User } from '../types'

export type ContextType = {
    user: User | undefined
    dispatch: React.Dispatch<UserActions>
}

export const UserContext = createContext<ContextType | null>(null)

const userReducer = (state: UserState, action: UserActions) => {
    switch(action.type){
        case "LOGIN":{
            return {
                user: action.payload
            }
        }
        case "LOGOUT": {
            return {
                user: undefined
            }
        }
        default: {
            return state
        }
    }
}

export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(userReducer, {user: undefined})

    useEffect(() => {
        const user = localStorage.getItem('userFS')
        if(user){
            dispatch({type: 'LOGIN', payload: JSON.parse(user)})
        }
    },[])
    
    return <UserContext.Provider value={{...state, dispatch}}>
        {children}
    </UserContext.Provider>
}