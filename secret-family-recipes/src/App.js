import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'

import "./App.css";

function App() {
 return (
    <div className="App">
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
    

       </div >
  );
}

export default App;