import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const { recipes, favorites, addFavorite, removeFavorite, searchTerm } = useRecipeStore((state) => ({
    recipes: state.recipes,
    favorites: state.favorites,
    addFavorite: state.addFavorite,
    removeFavorite: state.removeFavorite,
    searchTerm: state.searchTerm.toLowerCase(),
  }));

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm)
  );

  const toggleFavorite = (id) =>
    favorites.includes(id) ? removeFavorite(id) : addFavorite(id);

  return (
    <div>
      <h2>All Recipes</h2>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
          <Link to={`/edit/${recipe.id}`}>Edit</Link>
          <button onClick={() => toggleFavorite(recipe.id)}>
            {favorites.includes(recipe.id) ? '★ Unfavorite' : '☆ Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
