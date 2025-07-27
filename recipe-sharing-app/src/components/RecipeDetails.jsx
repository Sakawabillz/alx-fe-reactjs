import { useParams, Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore(state => 
    state.recipes.find(recipe => recipe.id === id)
  );
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);
  const navigate = useNavigate();

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const handleDelete = () => {
    deleteRecipe(id);
    navigate('/');
  };

  return (
    <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
        &larr; Back to recipes
      </Link>
      
      <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h1 style={{ margin: 0 }}>{recipe.title}</h1>
          <div>
            <Link 
              to={`/edit/${recipe.id}`} 
              style={{
                marginRight: '1rem',
                padding: '0.5rem 1rem',
                background: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-block'
              }}
            >
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              style={{
                padding: '0.5rem 1rem',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete
            </button>
          </div>
        </div>
        
        <p style={{ color: '#666', fontSize: '1.1rem' }}>{recipe.description}</p>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Ingredients</h3>
          <ul style={{ paddingLeft: '1.5rem' }}>
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )) || <li>No ingredients listed</li>}
          </ul>
        </div>
        
        <div style={{ marginTop: '2rem' }}>
          <h3>Instructions</h3>
          <div style={{ whiteSpace: 'pre-line' }}>
            {recipe.instructions || 'No instructions provided.'}
          </div>
        </div>
        
        {recipe.cookingTime && (
          <div style={{ marginTop: '2rem', color: '#666' }}>
            <strong>Cooking Time:</strong> {recipe.cookingTime}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
