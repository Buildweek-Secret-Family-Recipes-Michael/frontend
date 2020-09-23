
import React, { useState, createContext, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AddRecipe from "./components/AddRecipe";
import {axiosWithAuth} from './utils/axiosWithAuth';
import PrivateRoute from "./components/PrivateRoute";



import "./App.css";
export const RecipeContext = createContext();
export const GetRecipesContext = createContext();


function App() {
  const [recipes, setRecipes] = useState([]); // Will use whatever data we pull in from the get request here.
  console.log(recipes);
  const getRecipes = () => {
    axiosWithAuth()
      .get("/api/recipes")
      .then((res) => {

        console.log(res.data)
        setRecipes(res.data.recipes)})

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">

      <RecipeContext.Provider value={ {recipes} }>
        <GetRecipesContext.Provider value={ {getRecipes} }>
          <h1>The Secret Family Recipes</h1>

          <nav>
            <Link to="/Home">Home</Link>
            <Link to="/">Login</Link>
            <Link to="/Register">Register Here</Link>
          </nav>

          <Switch>
            <Route path="/Home">
              <Home />
            </Route>
            <Route path="/AddRecipe">
              <AddRecipe />
            </Route>
            <Route exact path="/">
              <LoginForm />
            </Route>
            <Route exact path="/Register">
              <RegisterForm />
            </Route>
          </Switch>
        </GetRecipesContext.Provider>
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
