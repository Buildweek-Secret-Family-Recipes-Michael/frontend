// This is where the user onboarding form will live. UserForm will authenticate user and push them to main page.
// Once pushed to the main page, the user can see all recipe cards in database, then they can click on navbar add recipe link to take them to add recipe form page.
import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";
const formSchema = yup.object().shape({
  username: yup.string(),
  password: yup.string(),

})
export default function RegisterForm() {
    const [userState, setUserState] = useState({
      username: '',
      password: '',

    })
  const [errState, setErrState] = useState({
    username: '',
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

<<<<<<< HEAD
        <section className='formContent'>    
          <label className="Labels" htmlFor='username'>
          User Name
                <div className="Form-input">
              <input
                className="inputText"
                id='name'
                    type='name'
                    name='name'
                    placeholder='Name here'
                    value={userState.name}
                    onChange={inputChange}
                  />
            </div>
            
  {errState.username.length > 6 ? (
                <p className="error">{errState.name}</p>
                ) : null}
               
                    
          </label></section>
        <section className='formContent'>  <label
            className="Labels" htmlFor='lastName'>Last Name
              <div>
              <input 
                 className="inputText"
                id='lastName'
                  type='lastName'
                  name='lastName'
                  placeholder='Last Name here'
                  value={userState.lastName}
                  onChange={inputChange}
                />
              </div>
                    
          </label></section>
        
          <section className='formContent'>      <label
          className="Labels"   htmlFor="email">Email
              <div>
=======
                <section className='formContent'>    <label
          className="Labels"   htmlFor="username">User Name
            <div className="Form-input">
>>>>>>> fe36500e65588742dc2bb9e6659dcee58130a756

              <input
                 className="inputText"
                id="username"
                type="username"
                name="username"
                placeholder="create your user name"
                value={userState.username}
                onChange={inputChange}
              />
            </div>
          </label>
          </section>


          <section className='formContent'>    <label
            className="Labels" htmlFor="password">Password
              <div className="Form-input">
              <input
                 className="inputText"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userState.password}
                  onChange={inputChange}
                />
              </div>

          </label></section>

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