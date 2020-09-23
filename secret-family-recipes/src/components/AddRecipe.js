// This is where the add recipe form will live (in infamy).
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { GetRecipesContext } from "../App";
import { axiosWithAuth } from "../utils/axiosWithAuth";
// for added ingred, instr rendered as list see todo assignments
const initialRecipeFormInfo = {
    name: "",
    category: "Breakfast",
    ingredientAmount: "",
    ingredientName: "",
    instructionStepNum: "",
    instruction: "",
    ingredients: [],
    instructions: []
};

const AddRecipe = () => {
    const [recipeInfo, setRecipeInfo] = useState(initialRecipeFormInfo);
    const [ingredientAmount, setIngredientAmount] = useState("");
    const [ingredientName, setIngredientName] = useState("");
    const [instructionStepNum, setInstructionStepNum] = useState("");
    const [instruction, setInstruction] = useState("");

    const { push } = useHistory();
    // const getRecipes = useContext(GetRecipesContext).getRecipes;
    const { getRecipes } = useContext(GetRecipesContext);
    // console.log(recipeInfo.ingredients);

/////////////////////////////////////////////////////

    // ingredientName state-setting change-handler
    const handleIngredientNameInput = (e) => {
        console.log("asdf");
        setIngredientName({
            ...ingredientName,
            [e.target.name]: e.target.value
        });
    };

    // ingredientAmount state-setting change-handler
    const handleIngredientAmountInput = (e) => {
        setIngredientAmount({
            ...ingredientAmount,
            [e.target.name]: e.target.value
        });
    };

//////////////////////////////////////////////////

     // ingredientName state-setting change-handler
     const handleInstructionStepNumInput = (e) => {
        setInstructionStepNum({
            ...instructionStepNum,
            [e.target.name]: e.target.value
        });
    };

    // ingredientAmount state-setting change-handler
    const handleInstructionInstructionInput = (e) => {
        setInstruction({
            ...instruction,
            [e.target.name]: e.target.value
        });
    };

//////////////////////////////////////////////////


    // This handleChanges works in the absence of ingredients/instructions inputs
    // (i.e. the form is able to post name/category to the database).
    const handleChanges = (e) => {
        setRecipeInfo({
            ...recipeInfo,
            [e.target.name]: e.target.value
        });
    };

    // to be triggered by onClick on "Add New Ingredient" button 
    const handleIngredientInput = (e) => {
        console.log("handleIngredient called");
        e.preventDefault();
        setRecipeInfo({
            ...recipeInfo,
            ingredients: [
                ...recipeInfo.ingredients, 
                {amount: ingredientName, name: ingredientAmount}
            ]
        });
    };
    // to be triggered by onClick on "Add New Instruction" button 
    const handleInstructionInput = (e) => {
        e.preventDefault();
        setRecipeInfo({
            ...recipeInfo,
            instructions: [
                ...recipeInfo.instructions, 
                {stepNum: instructionStepNum, name: instruction}
            ]
        });
    };

    // to post the final added recipe
    // (with ingredients and instructions arrays)
    const handleSubmit = (e) => {
        console.log("from handleSubmit", recipeInfo.ingredients);
        const newRecipe = {
            name: recipeInfo.name, 
            category: recipeInfo.category, 
            ingredients: recipeInfo.ingredients,
            instructions: recipeInfo.instructions
        }
        // console.log("newRecipe", newRecipe);
        e.preventDefault();
        axiosWithAuth()  
            .post("/api/recipes", newRecipe)
            .then( (res) => {
                console.log(res.data)
                getRecipes();
                push("/Home");
            })
            .catch( (err) => console.log(err));
    };

    return (
        <div>
            <form className="add-recipe-form" onSubmit={handleSubmit}>
                <h1>Add A Recipe Here:</h1>

                <div className="add-form-wrapper">
                    <h2>Recipe Name:</h2>
                    {/* This input, apparently, works. */}
                    <input 
                        type="text"
                        name="name"
                        onChange={handleChanges}
                        placeholder="Name"
                        value={recipeInfo.name}
                    />
                </div>

                <div className="add-form-wrapper">
                    <h2>Recipe Source: </h2>
                </div>

                <div className="add-form-wrapper">
                    <h2>Recipe Category:</h2>
                    {/* This dropdown, apparently, works. */}
                    <select
                        name="category"
                        onChange={handleChanges}
                        value={recipeInfo.category}
                    >
                        <option value="category: breakfast">Breakfast</option>
                        <option value="category: lunch">Lunch</option>
                        <option value="category: dinner">Dinner</option>
                        <option value="category: dessert">Dessert</option>
                    </select>
                </div>

                <div className="add-form-wrapper">
                <h2>Ingredient Amount:</h2>

                    <input
                        type="text"
                        name="ingredientAmount"
                        onChange={handleIngredientAmountInput}
                        placeholder="ingredient amount"
                        value={recipeInfo.ingredients.amount}
                    />

                <h2>Ingredient Name:</h2>

                    <input
                        type="text"
                        name="ingredientName"
                        onChange={handleIngredientNameInput}
                        placeholder="ingredient name"
                        value={recipeInfo.ingredients.name}
                    />

                </div>
                {/* intended to set <ingredients: [{ amount: "", name: "" }]> to state */}
                <button onClick={handleIngredientInput}>Add New Ingredient</button>

                <div className="add-form-wrapper">
                    <h2>Step Number:</h2>

                    <input
                        type="text"
                        name="instructionStepNum"
                        // change onChange to a state-setting handleChanges?
                        onChange={handleInstructionStepNumInput}
                        placeholder="step number"
                        value={recipeInfo.instructions.StepNum}
                    />

                    <h2>Step Procedure:</h2>

                    <input
                        type="text"
                        name="instruction"
                        // change onChange to a state-setting handleChanges?
                        onChange={handleInstructionInstructionInput}
                        placeholder="instruction"
                        value={recipeInfo.instructions.instructions}
                    />

                </div>
                {/* intended to set <instructions: [{ stepNum: "", instructions: "" }]> to state */}
                <button onClick={handleInstructionInput}>Add New Instruction</button>

                <hr />
                <button>Add New Recipe</button>
            </form>
        </div>
    );
};

export default AddRecipe;