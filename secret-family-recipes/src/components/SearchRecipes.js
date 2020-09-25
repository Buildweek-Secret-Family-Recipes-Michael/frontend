import React, { useState, useEffect, useContext } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import Recipe from "./Recipe";
import { RecipeContext } from "../App";

const initialRecipe = {
    name: "",
    source: "",
    category: "Breakfast",
    ingredientAmount: "",
    ingredientName: "",
    instructionStepNum: "",
    instruction: "",
    ingredients: [],
    instructions: []
};

const SearchRecipes = () => {
    const [recipeList, setRecipeList] = useState(initialRecipe);
    const [category, setCategory] = useState()

    const { recipes, setRecipes } = useContext(RecipeContext);

    const handleChanges = (e) => {
        setCategory(e.target.value)
    }

    console.log(recipes);

    useEffect( () => {
        console.log(category);
        axiosWithAuth()
        .get("/api/recipes/")
        .then( (res) => {
          console.log("get from search", res.data);
          const usersRecipes = res.data.recipes;
          const filteredRecipes = usersRecipes.filter( recipe => recipe.category === category)
        setRecipes(filteredRecipes);
        })
        .catch( (err) => console.log(err));

    }, [category]);

    return (
        <div>
            <form>
                <div className="add-form-wrappers">
                    <h2>Search Recipes by Category:</h2>
                    <select
                        name="category"
                        onChange={handleChanges}
                        value={category}
                    >
                        <option value="category: breakfast">Breakfast</option>
                        <option value="category: lunch">Lunch</option>
                        <option value="category: dinner">Dinner</option>
                        <option value="category: dessert">Dessert</option>
                    </select>
                </div>
            </form>

            <div className="recipes-container">
                {recipes.map((recipe) => (
                    <Recipe key={recipe.id} recipe={recipe} />
                ))}
            </div>
           
        </div>
    );
};

export default SearchRecipes;

/*
    console.log(recipes);
    useEffect( () => {
        console.log();
        axiosWithAuth()
          .get("/api/recipes/")
          .then( (res) => {
            console.log("get from search", res.data);
            // Check on appropriate response to set to state!
            setRecipes(res.data)
          })
          .catch( (err) => console.log(err));
      }, []);
*/