import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const DeleteRecipe = (recipe) => {
    axiosWithAuth()
        .delete(`${recipe.id}`)
        .then( (res) => {
            console.log(res.data)
        })

    return (
        <div>
            <ul>
                {recipes.map(recipe => (
                    <li onClick={() => DeleteRecipe(recipe)}>
                        {recipe.name}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default DeleteRecipe;