import type { Recipe } from "../types";
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import DeleteRecipe from "./DeleteRecipe";

type Props = {
    recipe: Recipe
    allowEdit?: boolean
}

const RecipeCard = ({recipe, allowEdit}:Props) => {
    return ( 
        <div className="recipe-card">
            {allowEdit && <DeleteRecipe recipe={recipe} className="recipe-delete"/>}
            <img src={recipe.image || '/template.jpg'} alt=""/>
            <div className="recipe-card__info">
                <h2>
                    <span className="category">{recipe.category}</span>
                    {recipe.title}
                </h2>
                <Link className="btn" to={`/recipe/id/${recipe._id}`}>check <IoIosArrowForward/></Link>
            </div>
        </div>
     );
}
 
export default RecipeCard;