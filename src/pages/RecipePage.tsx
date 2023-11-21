import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Author, Recipe } from '../types'
import ListElement from '../components/ListElement'
import avatar from '../assets/avatar.jpg'
import Loading from '../components/Loading'
import ErrorBlock from '../components/ErrorBlock'

const RecipePage = () => {
    const { id } = useParams()
    const [recipe,setRecipe] = useState<Recipe | null>(null)
    const [author, setAuthor] = useState<Author | null>()
    const [error,setError] = useState<string | null>(null)
    
    useEffect(() => {
        const fetchRecipe = async() => {
            try{
                const response = await fetch(`${import.meta.env.VITE_SERVER_API}/recipes/r/${id}`)
                const data = await response.json()
    
                if(response.ok){
                    document.title = `${data.title}`
                    setRecipe(data)
                    setAuthor(data.author)
                }
                if(!response.ok){
                    setError(data.error)
                }
            }catch{
                setError('Something went wrong')
            }
        }
        fetchRecipe()
    },[id])

    return ( 
        <div className='recipe-single'>
            {!recipe && !error && <Loading/>}
            {error && <ErrorBlock bug={true}>{error}</ErrorBlock>}
            {recipe && <>
                <img src={recipe.image || '/template.jpg'} alt=''/>
                <div className='recipe-info'>
                    <div className="row-1">
                        <p className='category'>{recipe.category}</p>
                        <h1>{recipe.title}</h1>
                        <div className='user-box'>
                            {author && <Link to={`/profile/${author.username}`} className='user-box__avatar'>
                                <img src={author.avatar || avatar} alt=''/>
                                <h3>{author.username}</h3>
                            </Link>}
                        </div>
                        <p>{recipe.description}</p>
                    </div>

                    <ListElement title='Ingredients' className='row-2'>
                        {recipe.ingredients.map((item,index) => (
                            <li key={index}> - {item}</li>
                        ))}
                    </ListElement>

                    <ListElement title='Steps' className='row-3'>
                        {recipe.steps.map((item, index) => (
                            <li key={index}>
                                <h2>{item.title}</h2>
                                <p>{item.description}</p>
                            </li>
                        ))}
                    </ListElement>
                </div>
            </>}
        </div>
     );
}
 
export default RecipePage;