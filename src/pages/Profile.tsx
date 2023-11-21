import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Recipe, type User } from '../types'
import RecipeCard from '../components/RecipeCard'
import UserBox from '../components/UserBox'
import useUserContext from '../hooks/useUserContext'
import Loading from '../components/Loading'
import ErrorBlock from '../components/ErrorBlock'

const Profile = () => {
    const { user:currentUser } = useUserContext()
    const { username } = useParams()
    const [user,setUser] = useState<User | null>(null)
    const [recipes,setRecipes] = useState<Recipe[] | null>(null)
    const [error,setError] = useState<string | null>(null)
    const [recipesError, setRecipesError] = useState<string | null>(null)

    document.title = `${username} profile`

    useEffect(() => {
        const fetchUserPosts = async () => {
            const userRes = await fetch(`${import.meta.env.VITE_SERVER_API}/users/u/${username}`)
            const data = await userRes.json()
            
            if(!userRes.ok){
                setError(data.error)
            }
            if(userRes.ok){
                setUser(data)
                const recipesRes = await fetch(`${import.meta.env.VITE_SERVER_API}/recipes/user/${username}`)
                const dataRecipe = await recipesRes.json()
                
                if(!recipesRes.ok){
                    setRecipesError(dataRecipe.error)
                }
                if(recipesRes.ok){
                    setRecipes(dataRecipe)
                }
            }
        }
        fetchUserPosts()
    },[username])

    return ( 
        <div>
            <div>
                {!user && !error && <Loading/>}
                {error && <ErrorBlock bug={true}>{error}</ErrorBlock>}
                {user && !error && <UserBox user={user} allowEdit={currentUser && user._id === currentUser._id}/>}
            </div>
            <div>
                {!recipes && !recipesError && <Loading/>}
                {recipesError && <ErrorBlock bug={true}>{recipesError}</ErrorBlock>}
                {recipes && recipes.length === 0 && <ErrorBlock>This user doesnt have any recipes</ErrorBlock>}
                {recipes && recipes.length > 0 && <>
                    <h1 style={{marginTop: '1rem'}}>{username} Recipes</h1>
                    <div className="recipe-list">
                        {recipes.map((item,index) => (
                            <RecipeCard recipe={item} key={index} allowEdit={(user && currentUser && user._id === currentUser._id) || false}/>
                        ))}
                    </div>
                </>}
            </div>
        </div>
     );
}
 
export default Profile;