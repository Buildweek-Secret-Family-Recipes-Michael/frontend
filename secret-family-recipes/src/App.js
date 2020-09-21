import React from "react";
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm'
import "./App.css";



function App() {
 return (
    <div className="App">

     
     <nav>
       <h1 className="Title">The Secret Family Recipes</h1>
       <section className="links">
       <Link to="/Home">Home</Link>
       <Link to="/">Login</Link>
         <Link to='/Register'>Register Here</Link>
       </section>
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