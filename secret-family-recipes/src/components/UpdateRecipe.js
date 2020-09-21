// This is where editing and deleting functionality will reside.

import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialRecipe = {
  title: "",
  source: "",
  ingredients: "",
  instructions: "",
  category: "",
};

const EditDelete = () => {
  const [recipe, setRecipe] = useState(initialRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(``, recipe)
      .then((res) => {
        setRecipe(res.data);
      })
      .catch((err) => console.log(err));
  };

  const changeHandler = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Edit Title"
          value={recipe.title}
        />
        <input
          type="text"
          name="source"
          onChange={changeHandler}
          placeholder="Edit Source"
          value={recipe.source}
        />
        <input
          type="text"
          name="ingredients"
          onChange={changeHandler}
          placeholder="Edit Ingredients"
          value={recipe.ingredients}
        />
        <input
          type="text"
          name="instructions"
          onChange={changeHandler}
          placeholder="Edit Instructions"
          value={recipe.title}
        />
        <input
          type="text"
          name="category"
          onChange={changeHandler}
          placeholder="Edit Title"
          value={recipe.title}
        />

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditDelete;
