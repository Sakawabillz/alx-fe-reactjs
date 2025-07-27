// src/components/RecipeList.jsx
import React from "react";
import { useRecipeStore } from "../store/recipeStore";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  return (
    <div>
      <h2>Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes available.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id}>
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <Link to={`/edit/${recipe.id}`}>Edit</Link> |{" "}
              <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecipeList;
