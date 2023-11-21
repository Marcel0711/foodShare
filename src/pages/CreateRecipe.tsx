import { useState } from "react";
import CategorySelector from "../components/CategorySelector";
import { Category, Step } from "../types";
import {IoIosAdd, IoIosRemove} from 'react-icons/io'
import useUserContext from "../hooks/useUserContext";
import { useNavigate } from 'react-router-dom'

const CreateRecipe = () => {
    const { user } = useUserContext()
    const [title,setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [category, setCategory] = useState<Category | ''>('breakfast')
    const [ingredients, setIngredients] = useState<string>('')
    const [steps, setSteps] = useState<Step[]>([{title: '', description: ''}])
    const [image,setImage] = useState<string>('')
    const [error,setError] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    document.title = 'Create recipe'

    const increaseFields = ():void => {
        const temp = [...steps]
        temp.push({title: '', description:''})
        setSteps(temp)
    }

    const deleteField = (index:number):void => {
        const temp = steps.filter((_e,i) => index !== i)
        setSteps(temp)
    }

    const changeFieldValue = (index:number, field: 'title' | 'description', value: string) => {
        const temp = [...steps]
        temp[index][field] = value
        setSteps(temp)
    }

    const handleSubmit = async(e:React.FormEvent) => {
        e.preventDefault()
        if(isLoading || !user){
            return
        }
        setError(null)
        setIsLoading(true)
        const preparedIngredients = ingredients.split(',').map((item) => item.trim())

        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_API}/recipes/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    category,
                    ingredients: preparedIngredients,
                    steps: steps,
                    author_id: user._id,
                    image: image
                })
            })

            const data = await response.json()

            if(response.ok){
                navigate(`/recipe/id/${data._id}`)
            }
            if(!response.ok){
                setError(data.error)
            }
        }catch(err){
            setError('Something went wrong')
        }

        setIsLoading(false)
    }

    return ( 
        <form onSubmit={handleSubmit}>
            <h1>Create new recipe</h1>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            
            <label>Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)}/>

            <label>Image Url</label>
            <input type="text" value={image} onChange={(e) => setImage(e.currentTarget.value)}/>

            <CategorySelector category={category} setCategory={setCategory} notNull/>

            <label>Ingredients (please separate with a comma ',')</label>
            <textarea value={ingredients} onChange={(e) => setIngredients(e.currentTarget.value)}/>

            <label className="steps-label">Steps <button type="button" onClick={increaseFields}><IoIosAdd/></button></label>
            {steps.map((item, index) => (
                <div key={index}>
                    <div className="steps-box">
                        <input placeholder="title" type="text" value={item.title} onChange={(e) => changeFieldValue(index, 'title', e.currentTarget.value)}/>
                        <button type="button" onClick={() => deleteField(index)}><IoIosRemove/></button>
                    </div>
                    <textarea placeholder="description" value={item.description} onChange={(e) => changeFieldValue(index, 'description', e.currentTarget.value)}/>
                </div>
            ))}
            <button type="submit" disabled={isLoading}>Create</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
}
 
export default CreateRecipe;