// This is where editing and deleting functionality will reside.

import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialRecipe = {
  recipe: "",
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
        <input />
        <input />
        <input />
        <input />
        <input />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default EditDelete;
