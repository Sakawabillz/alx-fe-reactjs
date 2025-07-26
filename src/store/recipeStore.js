// src/store/recipeStore.js
import { create } from 'zustand'

export const useRecipeStore = create((set) => ({
  recipes: [],
  
  // Add a new recipe
  addRecipe: (newRecipe) => set((state) => ({
    recipes: [...state.recipes, newRecipe]
  })),
  
  // Update an existing recipe
  updateRecipe: (id, updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe => 
      recipe.id === id ? { ...recipe, ...updatedRecipe } : recipe
    )
  })),
  
  // Delete a recipe
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id)
  })),
  
  // Get a single recipe by ID
  getRecipe: (id) => {
    return useRecipeStore.getState().recipes.find(recipe => recipe.id === id);
  },
  
  // Set recipes (useful for initial loading)
  setRecipes: (recipes) => set({ recipes })
}));
