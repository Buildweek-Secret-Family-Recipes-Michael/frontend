// This is where the add recipe form will live. 
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GetRecipesContext } from "../App";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialRecipeInfo = {
    name: "",
    category: "",
    ingredients: [{
        amount: "",
        name: ""
    }],
    instructions: [{
        stepNum: "",
        name: ""
    }],
};

const AddRecipe = () => {
    const [recipeInfo, setRecipeInfo] = useState(initialRecipeInfo);
    const { push } = useHistory();
    // useContext method (see Context API guided-project Siblings.js lines 1, 2, & 6)
    // version 1: dot notation 
    // const getRecipes = useContext(GetRecipesContext).getRecipes;
    // version 2: destructured object
    const { getRecipes } = useContext(GetRecipesContext);

    const handleChanges = (e) => {
        if (e.target.name === "ingredients") {
            setRecipeInfo({
                ...recipeInfo,
                // ???
                ingredients: e.target.name.value
            });
        } else if (e.target.name === "instructions") {
            setRecipeInfo({
                ...recipeInfo,
                // ???
                instructions: e.target.name.value
            });
        } else {
            setRecipeInfo({
                ...recipeInfo,
                [e.target.name]: e.target.value
            });
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axiosWithAuth()  
            .post("https://secret-family-recipes-pt16.herokuapp.com/api/recipes", recipeInfo)
            .then( (res) => {
                console.log(res.data)
                getRecipes();
                push("/Home");
            })
            .catch( (err) => console.log(err));
    };

    return (
        <div>
            <h1>Add A Recipe Here:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h2>Recipe Name:</h2>
                    <input 
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChanges}
                        placeholder="Name"
                        value={recipeInfo.name}
                    />
                </label>

                <label htmlFor="category">
                    <h2>Recipe Category:</h2>
                    <select
                        name="category"
                        id="category"
                        onChange={handleChanges}
                        value={recipeInfo.category}
                    >
                        <option value="category: breakfast">Breakfast</option>
                        <option value="category: lunch">Lunch</option>
                        <option value="category: dinner">Dinner</option>
                        <option value="category: dessert">Dessert</option>
                    </select>
                </label>

                <label htmlFor="ingredients">
                    <h2>Ingredients:</h2>
                    <input
                        type="text"
                        name="ingredients"
                        id="ingredients"
                        onChange={handleChanges}
                        placeholder="Ingredients"
                        value={recipeInfo.ingredients}
                    />
                </label>

                <label htmlFor="instructions">
                    <h2>Instructions:</h2>
                    <input
                        type="text"
                        name="instructions"
                        id="instructions"
                        onChange={handleChanges}
                        placeholder="Instructions"
                        value={recipeInfo.instructions}
                    />
                </label>
                <div>
                    spacer
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;

