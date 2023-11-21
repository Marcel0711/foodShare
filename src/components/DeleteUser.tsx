import useUserContext from "../hooks/useUserContext";
import { IoIosTrash } from 'react-icons/io'
import { useState } from 'react' 
import Modal from './Modal'
import { useNavigate } from "react-router-dom";

const DeleteUser = ({className}:{className: string}) => {
    const { user, dispatch } = useUserContext()
    const [isActive, setIsActive] = useState<boolean>(false)
    const [usernameConfirm, setUsernameConfirm] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [error,setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDelete = async(e:React.FormEvent) => {
        e.preventDefault()
        if(!user || usernameConfirm !== user.username){
            return
        }

        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/users/${user._id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    password: passwordConfirm
                })
            })

            const data = await response.json()
            if(response.ok){
                dispatch({type: "LOGOUT"})
                navigate('/signup')
            }
            if(!response.ok){
                setError(data.error)   
            }

        }catch(err){
            setError('Something went wrong')
        }
    }

    return ( 
        <>
            <button onClick={() => setIsActive(true)} className={`btn btn-secondary btn-red ${className}`}><IoIosTrash/></button>
            {isActive && (
                <Modal setActive={setIsActive}>
                    <p>Do you really wish to delete your profile, all your recipes will be deleted as well. If you still want to delete your account type in your username and password below.</p>
                    <form onSubmit={handleDelete}>
                        <label>username <strong>*{user?.username}*</strong></label>
                        <input type="text" value={usernameConfirm} onChange={(e) => setUsernameConfirm(e.currentTarget.value)}/>

                        <label>password</label>
                        <input type="password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.currentTarget.value)}/> 

                        <button disabled={usernameConfirm !== user?.username} className="btn">delete <IoIosTrash/></button> 
                        {error && <p className="error">{error}</p>}
                    </form>
                </Modal>
            )}
        </>
     );
}
 
export default DeleteUser;