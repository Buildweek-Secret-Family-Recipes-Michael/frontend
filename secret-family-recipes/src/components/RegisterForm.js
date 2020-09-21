// This is where the user onboarding form will live. UserForm will authenticate user and push them to main page. 

// Once pushed to the main page, the user can see all recipe cards in database, then they can click on navbar add recipe link to take them to add recipe form page. 


import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";


const formSchema = yup.object().shape({
    name: yup.string().min(4, '4 characters minimum for name').required("Name required"),
    lastName: yup.string().required("Last Name required"),
    email: yup.string('@').email('Valid Email needed').required('must include email'),
    password: yup.string().min(5, 'password needs to be more than 5 characters long'),
    username: yup.string().min(5, "5 characters minimum for your user name").required("user name required"),
    terms: yup.boolean().oneOf([true], "please validate you are human")
})

export default function RegisterForm() {
    const [userState, setUserState] = useState({
      name: '',
      lastName:'',
      email: '',
      password: '',
      username:'',
      terms:false,
    })


  const [errState, setErrState] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    username:'',
    terms:'',
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
        
          <section className='formContent'>    <label className="Labels" htmlFor='name'>Name
                <div>
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
            
  {errState.name.length > 6 ? (
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
              <input
                 className="inputText"
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
                    
          </label></section>
    
                <section className='formContent'>    <label
            className="Labels" htmlFor="password">Password
              <div>
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

              {errState.password.length > 6 ? (
              <p className="error">{errState.password}</p>
              ) : null}
            
          </label></section>
      
          <section className='formContent'>    <label
          className="Labels"   htmlFor="username">User Name
            <div>
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

                {errState.username.length > 5 ? (
                <p className="error">{errState.username}</p>
                ) : null}</section>
      
          <section className='formContent'>  <label htmlFor="validate"> 
            <div className='Validate'>
              Validate Here
              <input
                
                type="checkbox"
                id="terms"
                name="terms"
                checked={userState.terms}
                onChange={inputChange}
              />
          </div>

              {errState.terms.length > 1 ? (
              <p className="error">{errState.terms}</p>
              ) : null}
            
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