// This is where the add recipe form will live. 
import React, { useState } from "react";
import axios from "axios";

const initialRecipeInfo = {
    title: "",
    source: "",
    ingredients: [],
    instructions: [],
    category: ""
};

const AddRecipe = () => {
    const [recipeInfo, setRecipeInfo] = useState(initialRecipeInfo);

    // changeHandler here

    const handleSubmit = (e) => {
        e.preventDefault();

        axios  
            .post("", recipeInfo)
            .then( (res) => {
                console.log(res.data)
            })
            .catch( (err) => console.log(err));
    };

    return (<p>filler text</p>);
    // form here 
};

export default AddRecipe;

