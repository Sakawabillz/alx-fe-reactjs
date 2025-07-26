import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecipeStore } from '../store/recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === id)
  );
  const updateRecipe = useRecipeStore(state => state.updateRecipe);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: '',
    cookingTime: '',
    ingredientInput: ''
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        title: recipe.title || '',
        description: recipe.description || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || '',
        cookingTime: recipe.cookingTime || '',
        ingredientInput: ''
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (formData.ingredientInput.trim()) {
      setFormData(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, prev.ingredientInput.trim()],
        ingredientInput: ''
      }));
    }
  };

  const handleRemoveIngredient = (index) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, description, ingredients, instructions, cookingTime } = formData;
    
    if (!title.trim()) return;
    
    updateRecipe(id, {
      title: title.trim(),
      description: description.trim(),
      ingredients: ingredients.filter(Boolean),
      instructions: instructions.trim(),
      cookingTime: cookingTime.trim(),
      updatedAt: new Date().toISOString()
    });
    
    navigate(`/recipe/${id}`);
  };

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>Edit Recipe</h1>
      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            Ingredients
          </label>
          <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
            <input
              type="text"
              value={formData.ingredientInput}
              onChange={(e) => setFormData(prev => ({ ...prev, ingredientInput: e.target.value }))}
              placeholder="Add an ingredient"
              style={{
                flex: 1,
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRight: 'none',
                borderTopLeftRadius: '4px',
                borderBottomLeftRadius: '4px',
                fontSize: '1rem'
              }}
            />
            <button
              onClick={handleAddIngredient}
              type="button"
              style={{
                padding: '0 1rem',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Add
            </button>
          </div>
          
          <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
            {formData.ingredients.map((ingredient, index) => (
              <li key={index} style={{ marginBottom: '0.25rem', display: 'flex', alignItems: 'center' }}>
                <span style={{ flex: 1 }}>{ingredient}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#f44336',
                    cursor: 'pointer',
                    marginLeft: '0.5rem',
                    fontSize: '1.2rem',
                    lineHeight: 1
                  }}
                >
                  ×
                </button>
              </li>
            ))}
            {formData.ingredients.length === 0 && (
              <li style={{ color: '#666', fontStyle: 'italic' }}>No ingredients added yet</li>
            )}
          </ul>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            Instructions
          </label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="6"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
              resize: 'vertical',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            Cooking Time (optional)
          </label>
          <input
            type="text"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            placeholder="e.g., 30 minutes"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <button
            type="button"
            onClick={() => navigate(`/recipe/${id}`)}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#f0f0f0',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipeForm;
