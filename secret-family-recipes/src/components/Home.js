import React from "react";
import { useHistory } from "react-router-dom";
import "../css/home.css";
import Recipes from "./Recipes";

function Home(props) {
  const history = useHistory();
  console.log("history: ", history);

  return (
    <div className="home-page">
      <Recipes />
    </div>
  );
}

export default Home;
