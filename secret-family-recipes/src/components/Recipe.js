
import React, { useContext }  from "react";
import {EditRecipe} from "./UpdateRecipe";
import { useHistory } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { RecipeContext } from "../App";


const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const { push } = useHistory();
  const params = useParams();

const Recipe = (props) => {
  const { push } = useHistory();
  const { setRecipes } = useContext(RecipeContext);

    return (
  <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
        />
        <Card.Header>Recipe Title: {props.recipe.name}</Card.Header>
<Card.Meta>Recipe Source: {props.recipe.source}</Card.Meta>
        <Card.Description>
          Category: <strong>{props.recipe.category}</strong>
        </Card.Description>
        {props.recipe.ingredients.length > 0 ? (
          props.recipe.ingredients.map((ing) => {
            console.log(ing);
            return (
              <Card.Description>
                Ingredient: <strong>{ing.name} {ing.amount}</strong>
              </Card.Description>
            );
          })
        ) : (
          <Card.Description>There are no ingredients</Card.Description>
        )}
        {props.recipe.instructions.length > 0 ? (
          props.recipe.instructions.map((inst) => {
            console.log(inst);
            return (
              <Card.Description>
                Instructions: <strong>{inst.stepNum} {inst.name}</strong>
              </Card.Description>
            );
          })
        ) : (
          <Card.Description>There are no ingredients</Card.Description>
        )}

      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={() => push(`/UpdateRecipe/${props.recipe.id}`)} >
            Edit
          </Button>
          <Button basic color="red" onClick={() => {
            axiosWithAuth()
              .delete(`/api/recipes/${props.recipe.id}`)
              .then( (res) => {
                axiosWithAuth()
                  .get("/api/recipes")
                  .then( (res) => {
                    setRecipes(res.data.recipes)
                  })
                  .catch(console.log)
              })
              .catch(console.log)
          }}>
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
);
};
export default Recipe;



