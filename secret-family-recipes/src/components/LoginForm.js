// This is where the user onboarding form will live. UserForm will authenticate user and push them to main page.

// Once pushed to the main page, the user can see all recipe cards in database, then they can click on navbar add recipe link to take them to add recipe form page.

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axios from "axios";

// validation
const formSchema = yup.object().shape({
  username: yup.string().required("user name required"),
  password: yup
    .string()
    .min(5, "password needs to be more than 5 characters long"),
});

export default function LoginForm() {
  const history = useHistory();
  const [userState, setUserState] = useState({
    username: "",
    password: "",
  });

  const [errState, setErrState] = useState({
    username: "",
    password: "",
  });
  //validation ^
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(() => {
    formSchema.isValid(userState).then((valid) => {
      setButtonDisabled(valid);
    });
  }, [userState]);
  // validation ^
  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      .reach(formSchema, e.target.name)
      .validate(value)
      .then((valid) => {
        setErrState({
          ...errState,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrState({
          ...errState,
          [e.target.name]: err.errors[0],
        });
      });
  };
  // validation ^
  const inputChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserState({ ...userState, [e.target.name]: value });
  };
  //relates to authentication ^

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("userState", userState);
    axios
      .post(
        "https://secret-family-recipes-pt16.herokuapp.com/api/users/login",
        userState
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.token);
        history.push("/protected");

      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={formSubmit}>
      <ul>
        <label htmlFor="username">
          User Name
          <div>
            <input
              id="username"
              type="username"
              name="username"
              placeholder="User Name"
              value={userState.username}
              onChange={inputChange}
            />
          </div>
        </label>

        <label htmlFor="password">
          Password
          <div>
            {" "}
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Password"
              value={userState.password}
              onChange={inputChange}
            />
          </div>
          {errState.password.length > 6 ? (
            <p className="error">{errState.password}</p>
          ) : null}
        </label>

        <button
          type="submit"
          id="submit"
          name="submit"
          disabled={!buttonDisabled}
        >
          Submit
        </button>
      </ul>
    </form>
  );
}
