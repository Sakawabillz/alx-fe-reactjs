// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No recipes yet. Add your first recipe to get started!</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Your Recipes</h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {recipes.map(recipe => (
          <div 
            key={recipe.id} 
            style={{
              background: '#fff',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s, box-shadow 0.2s',
              ':hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
              }
            }}
          >
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                padding: '1.5rem',
                ':hover': {
                  textDecoration: 'none'
                }
              }}
            >
              <h3 style={{ 
                margin: '0 0 0.5rem 0',
                color: '#2c3e50',
                fontSize: '1.5rem'
              }}>
                {recipe.title}
              </h3>
              <p style={{ 
                margin: '0 0 1rem 0',
                color: '#7f8c8d',
                fontSize: '1rem',
                lineHeight: '1.5'
              }}>
                {recipe.description || 'No description provided.'}
              </p>
              {recipe.cookingTime && (
                <div style={{
                  display: 'inline-block',
                  background: '#f0f8ff',
                  color: '#3498db',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                  fontWeight: '500'
                }}>
                  ⏱️ {recipe.cookingTime}
                </div>
              )}
            </Link>
            
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0.75rem 1.5rem',
              background: '#f9f9f9',
              borderTop: '1px solid #eee'
            }}>
              <Link 
                to={`/edit/${recipe.id}`}
                style={{
                  marginRight: '0.75rem',
                  padding: '0.5rem 1rem',
                  background: '#f0f0f0',
                  color: '#333',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                  ':hover': {
                    background: '#e0e0e0'
                  }
                }}
              >
                Edit
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (window.confirm('Are you sure you want to delete this recipe?')) {
                    deleteRecipe(recipe.id);
                  }
                }}
                style={{
                  padding: '0.5rem 1rem',
                  background: '#fff0f0',
                  color: '#e74c3c',
                  border: '1px solid #ffdddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'background 0.2s',
                  ':hover': {
                    background: '#ffe0e0'
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
