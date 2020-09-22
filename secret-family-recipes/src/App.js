import React, { useState, createContext, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import {axiosWithAuth} from './utils/axiosWithAuth';
import PrivateRoute from "./components/PrivateRoute";



import "./App.css";

export const RecipeContext = createContext();

function App() {
  const [recipes, setRecipes] = useState([]); // Will use whatever data we pull in from the get request here.
  console.log(recipes);
  const getRecipes = () => {
    axiosWithAuth()
      .get("/api/recipes")
      .then((res) => {
        console.log(res.data);
        setRecipes(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div className="App">
      <RecipeContext.Provider value={recipes}>
        <h1>The Secret Family Recipes</h1>
        <p> add your family recipe cards here!</p>

        <nav>
          <Link to="/protected">Home</Link>
          <Link to="/">Login</Link>
          <Link to="/Register">Register Here</Link>
        </nav>

        <Switch>
          <PrivateRoute exact path="/protected" component={Home}>
            <Home />
          </PrivateRoute>
          <Route exact path="/">
            <LoginForm />
          </Route>
          <Route exact path="/Register">
            <RegisterForm />
          </Route>
        </Switch>
      </RecipeContext.Provider>
    </div>
  );
}

export default App;
