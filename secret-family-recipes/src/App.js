import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
// import UserForm from './components/Form';

import "./App.css";

function App() {
 return (
    <div ClassName="App">
<h1>The Secret Family Recipes</h1>
     <p> add your family recipe cards here!</p>

       <nav>
      <Link to="/">Login</Link>
      <Link to="/Home">Home</Link>
</nav>
  

    <Switch>
         <Route path="/Home">
          <Home />
        </Route>
        {/* <Route exact path="/">
          <UserForm/>
        </Route> */}
      </Switch> 
    

       </div >
  );
}

export default App;