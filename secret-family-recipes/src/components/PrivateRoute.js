import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props => {
          if (localStorage.getItem("token")) {
            // if the token is in localStorage, render the given component
            return <Component {...props} />;
          } else {
            // redirect the user to the UserForm page
            console.log("redirecting to UserForm");
            return <Redirect to="/" />;
          }
        }}
      />
    );
  };
  
  export default PrivateRoute;