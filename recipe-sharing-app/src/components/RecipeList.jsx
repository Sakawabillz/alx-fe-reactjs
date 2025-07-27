// src/components/RecipeList.jsx
import React from 'react';
import { useRecipeStore } from '../recipeStore';
import RecipeCard from './RecipeCard';

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.filteredRecipes);

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipeList;
