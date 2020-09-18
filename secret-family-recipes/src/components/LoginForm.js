// This is where the user onboarding form will live. UserForm will authenticate user and push them to main page. 

// Once pushed to the main page, the user can see all recipe cards in database, then they can click on navbar add recipe link to take them to add recipe form page. 


import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
    email: yup.string('@').email('Valid Email needed').required('must include email'),
    password: yup.string().min(5, 'password needs to be more than 5 characters long'),
})

export default function LoginForm() {
    const [userState, setUserState] = useState({
        email: '',
        password: '',
    })


    const [errState, setErrState] = useState({
        email: '',
        password: '',
    })
    
    const [buttonDisabled, setButtonDisabled] = useState(true)
    useEffect(() => {
        formSchema.isValid(userState).then((valid) => {
            setButtonDisabled(valid);
        })
    }, [userState])

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

     const inputChange = (e) => {
    e.persist();
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUserState({ ...userState, [e.target.name]: value });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted for review");
    axios
      .post("https://reqres.in/api/users", userState)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };
    
    return (
        <form onSubmit={formSubmit}>
            <ul>
                
 <label htmlFor="email">Email
          <div>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Email"
              value={userState.email}
              onChange={inputChange}
            />
          </div>

                              {errState.email.length > 0? (
            <p className="error">{errState.email}</p>
                    ) : null}
                    
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
    )

}