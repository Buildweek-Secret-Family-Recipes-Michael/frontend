
import React, {useState, createContext} from "react";
import axios from 'axios'
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import "./App.css";

export const RecipeContext = createContext()

function App() {

  const [recipes, setRecipes] = useState([]) // Will use whatever data we pull in from the get request here. 

  const getRecipes = () => {
    axios
      .get("")
      .then((res) => setRecipes(res.data))
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
     
       <Link to="/Home">Home</Link>
       <Link to="/">Login</Link>
       <Link to='/Register'>Register Here</Link>
</nav>
  

    <Switch>
         <Route path="/Home">
          <Home />
        </Route>
        <Route exact path="/">
          <LoginForm/>
       </Route>
       <Route exact path="/Register">
          <RegisterForm/>
        </Route>
      </Switch> 
    
</RecipeContext.Provider>
       </div >
  );

}

export default App;