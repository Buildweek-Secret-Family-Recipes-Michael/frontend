import React, { useContext } from "react";
import { RecipeContext } from "../App.js";
import Recipe from "./Recipe";

const Recipes = (props) => {
  const { recipes } = useContext(RecipeContext);

  console.log(recipes);

  return (
    <div className="recipes-container">
      {recipes.map((recipe) => (
        <Recipe key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default Recipes;
