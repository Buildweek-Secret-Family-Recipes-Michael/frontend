import React, {useState, createContext} from "react";
import axios from 'axios'
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
    <div>
      <RecipeContext.Provider value={recipes}>
        //Handle all routes and links in here.
      </RecipeContext.Provider>
      
      </div>
  )
}

export default App;
