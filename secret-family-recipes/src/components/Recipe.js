import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, Image } from "semantic-ui-react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Recipe = (props) => {
  const [recipe, setRecipe] = useState(null);
  const { push } = useHistory();
  const params = useParams();

  const fetchRecipe = (id) => {
    axiosWithAuth()
      .get(`/api/recipes/${id}`)
      .then((res) => setRecipe(res.data))
      .catch((err) => console.log(err.response));
  };

  const deleteRecipe = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`/api/recipes/${recipe.id}`)
      .then((res) => {
        console.log(res);
        setRecipe(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRecipe(params.id);
  }, [params.id]);

  return (
    <div>
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
                return (
                  <Card.Description>
                    Ingredient:{" "}
                    <strong>
                      {ing.name} {ing.amount}
                    </strong>
                  </Card.Description>
                );
              })
            ) : (
              <Card.Description>There are no ingredients</Card.Description>
            )}
            {props.recipe.instructions.length > 0 ? (
              props.recipe.instructions.map((inst) => {
                return (
                  <Card.Description>
                    Instructions:{" "}
                    <strong>
                      {inst.stepNum} {inst.name}
                    </strong>
                  </Card.Description>
                );
              })
            ) : (
              <Card.Description>There are no ingredients</Card.Description>
            )}
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Edit
              </Button>
              <Button onClick={deleteRecipe} basic color="red">
                Delete
              </Button>
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
      ;
    </div>
  );
};

export default Recipe;
