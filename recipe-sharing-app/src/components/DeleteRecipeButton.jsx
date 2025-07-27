import { useNavigate } from 'react-router-dom';
import useRecipeStore from '../store/recipeStore';

const DeleteRecipeButton = ({ recipeId, onDelete, size = 'default' }) => {
  const navigate = useNavigate();
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(recipeId);
      if (onDelete) {
        onDelete();
      } else {
        navigate('/');
      }
    }
  };

  const buttonStyles = {
    small: {
      padding: '0.25rem 0.5rem',
      fontSize: '0.8rem',
      backgroundColor: '#f44336',
    },
    default: {
      padding: '0.5rem 1rem',
      fontSize: '0.9rem',
      backgroundColor: '#f44336',
    }
  };

  return (
    <button 
      onClick={handleDelete}
      style={{
        ...buttonStyles[size] || buttonStyles.default,
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        ':hover': {
          backgroundColor: '#d32f2f'
        }
      }}
    >
      {size === 'small' ? 'Delete' : 'Delete Recipe'}
    </button>
  );
};

export default DeleteRecipeButton;
