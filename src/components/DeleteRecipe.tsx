import useUserContext from "../hooks/useUserContext";
import { IoIosTrash } from 'react-icons/io'
import { useState } from 'react' 
import Modal from './Modal'
import type { Recipe } from '../types'
import { useNavigate } from "react-router-dom";

type Props = {
    className?: string
    recipe: Recipe
}

const DeleteRecipe = ({className, recipe}:Props) => {
    const { user } = useUserContext()
    const [isActive, setIsActive] = useState<boolean>(false)
    const [titleConfirm, setTitleConfirm] = useState<string>('')
    const [error,setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const handleDelete = async(e:React.FormEvent) => {
        e.preventDefault()
        setError(null)
        if(user?._id !== recipe.author){
            return
        }
        if(recipe.title !== titleConfirm){
            return
        }

        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/recipes/${recipe._id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${user.token}`
                },
            })
            const data = await response.json()

            if(response.ok){
                navigate('/')
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
                    <p>Do you really wish to delete this Recipe, if so please type in given name in field below.</p>
                    <form onSubmit={handleDelete}>
                        <label>title <strong>*{recipe.title}*</strong></label>
                        <input type="text" value={titleConfirm} onChange={(e) => setTitleConfirm(e.currentTarget.value)}/>

                        <button disabled={titleConfirm !== recipe.title} className="btn">delete <IoIosTrash/></button> 
                        {error && <p className="error">{error}</p>}
                    </form>
                </Modal>
            )}
        </>
     );
}
 
export default DeleteRecipe;