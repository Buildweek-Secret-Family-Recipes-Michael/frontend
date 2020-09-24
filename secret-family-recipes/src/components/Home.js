import React from "react";
import { useHistory, Link } from "react-router-dom";
import Recipes from "./Recipes";

function Home(props) {
  const history = useHistory();
  console.log("history: ", history);


  return (
    <div className="home-page">

      <Link className="AddRecipe" to="/AddRecipe">Add A Recipe</Link>
      <Recipes />

    </div>
  );

}

export default Home;
