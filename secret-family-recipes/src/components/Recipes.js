import React, {useContext} from 'react'
import {RecipeContext} from "../App.js"

const Recipes = () => {
    const {recipes} = useContext(RecipeContext)

    return(
        <div className="recipes-container">
            {recipes.map(recipe =>(
                <Recipe key={recipe.id} recipe={recipe}/>
            ))}
        </div>
    )
}

export default Recipes;