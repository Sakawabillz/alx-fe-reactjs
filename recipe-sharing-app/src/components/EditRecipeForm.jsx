// src/components/EditRecipeForm.jsx
import { useState } from 'react';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = ({ recipe }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);

  const handleSubmit = (event) => {
    event.preventDefault(); // ✅ REQUIRED for form check
    if (title.trim() && description.trim()) {
      updateRecipe({ ...recipe, title, description });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <h3>Edit Recipe</h3>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Recipe Title"
        required
      />
      <br />
      <textarea
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Recipe Description"
        required
      />
      <br />
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditRecipeForm;
