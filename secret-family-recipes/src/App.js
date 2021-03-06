
import React, { useState, createContext, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AddRecipe from "./components/AddRecipe";
import {axiosWithAuth} from './utils/axiosWithAuth';
import PrivateRoute from "./components/PrivateRoute";
import UpdateRecipe from "./components/UpdateRecipe";
import SearchRecipes from "./components/SearchRecipes";

import "./App.css";
import "./css/main.css";
import "./css/home.css";
import "./css/input.css";
export const RecipeContext = createContext();
export const GetRecipesContext = createContext();


function App() {
  const [recipes, setRecipes] = useState([]); // Will use whatever data we pull in from the get request here.
  console.log(recipes);
  const getRecipes = () => {
    axiosWithAuth()
      .get("/api/recipes")
      .then((res) => {


        console.log("data from axios:", res)
        setRecipes(res.data.recipes)})
        


      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">


      <RecipeContext.Provider value={{recipes, setRecipes} }>

        <GetRecipesContext.Provider value={{getRecipes}}>
         
          <nav>
       <h1 className="Title">The Secret Family Recipes</h1>
       <section className="links">
       <Link to="/protected">Home</Link>
       <Link to="/">Login</Link>
       <Link to='/Register'>Register Here</Link>
       </section>
      </nav>


          <Switch>
            <PrivateRoute exact path="/protected" component={Home}>
              <Home />
            </PrivateRoute>
            <Route path="/AddRecipe">
              <AddRecipe />
            </Route>
            <Route exact path="/">
              <LoginForm />
            </Route>
            <Route exact path="/Register">
              <RegisterForm />
            </Route>
            <Route path="/UpdateRecipe/:id">
              <UpdateRecipe />
            </Route>
            <Route path="/SearchRecipes">
              <SearchRecipes />
            </Route>
          </Switch>
        </GetRecipesContext.Provider>
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
