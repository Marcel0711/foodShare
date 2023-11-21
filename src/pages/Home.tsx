import CategorySelector from "../components/CategorySelector";
import type { Category, Recipe } from "../types";
import { useEffect, useState } from 'react'
import RecipeCard from "../components/RecipeCard";
import Loading from "../components/Loading";
import ErrorBlock from "../components/ErrorBlock";

const Home = () => {
    const [category, setCategory] = useState<Category | "">("")
    const [recipes, setRecipes] = useState<Recipe[] | null>(null)
    const [error, setError] = useState<string | null>(null)

    document.title = 'FoodShare'

    useEffect(() => {
        const fetchRecipes = async () => {
            try{
                const response = await fetch(`${import.meta.env.VITE_SERVER_API}/recipes/${category}`)
                const data = await response.json()
                if(response.ok){
                    setRecipes(data)
                }
                if(!response.ok){
                    setError(data.error)
                }
            }catch(err){
                setError('Something went wrong')
            }
        }
        fetchRecipes()
    },[category])

    return ( 
        <div>
            <CategorySelector category={category} setCategory={setCategory}/>
            {!error && !recipes && <Loading/>}
            {error && <ErrorBlock bug={true}>
                {error}
            </ErrorBlock>}
            {recipes && recipes.length === 0 && <ErrorBlock>
                We couldn't find any recipe from this category :(
            </ErrorBlock>}
            {recipes && recipes.length > 0 && 
                <div className="recipe-list">
                    {recipes.map((item,index) => (
                        <RecipeCard recipe={item} key={index}/>
                    ))}
                </div>
            }

        </div>
     );
}
 
export default Home;