import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const GetRecipes = () => {
    [recipesData, setRecipesData] = useState([]);
    axiosWithAuth()
        .get("")
        .then(res => {
            console.log(res.data)
            setRecipesData(res.data)
        })
        .catch(err => console.log(err.response))
};

useEffect( () => {
    GetRecipes();
}, []);

export default GetRecipes;