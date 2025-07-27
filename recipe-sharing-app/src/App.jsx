// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import useRecipeStore from './store/recipeStore';
import { useEffect } from 'react';

// Import components
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';

// Layout component for consistent styling
const Layout = ({ children }) => (
  <div style={{ 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '0 1rem 2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  }}>
    {children}
  </div>
);

// Header component
const Header = () => (
  <header style={{
    background: '#2c3e50',
    color: 'white',
    padding: '1rem 0',
    marginBottom: '2rem',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ 
        color: 'white', 
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        <span role="img" aria-label="fork and knife">🍽️</span>
        <span>Recipe Sharing</span>
      </Link>
      <nav>
        <Link to="/" style={{
          color: 'white',
          textDecoration: 'none',
          marginLeft: '1.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          transition: 'background-color 0.2s',
          ':hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)'
          }
        }}>
          All Recipes
        </Link>
        <Link 
          to="/add" 
          style={{
            backgroundColor: '#e74c3c',
            color: 'white',
            textDecoration: 'none',
            marginLeft: '1rem',
            padding: '0.5rem 1.5rem',
            borderRadius: '4px',
            fontWeight: '500',
            transition: 'background-color 0.2s',
            ':hover': {
              backgroundColor: '#c0392b'
            }
          }}
        >
          + Add Recipe
        </Link>
      </nav>
    </div>
  </header>
);

// Main content area
const MainContent = () => (
  <main style={{ flex: 1 }}>
    <Routes>
      <Route path="/" element={
        <>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ marginBottom: '1.5rem' }}>Discover Delicious Recipes</h1>
            <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '800px' }}>
              Browse through our collection of amazing recipes or add your own to share with the community!
            </p>
          </div>
          <RecipeList />
        </>
      } />
      <Route path="/add" element={<AddRecipeForm />} />
      <Route path="/recipe/:id" element={<RecipeDetails />} />
      <Route path="/edit/:id" element={<EditRecipeForm />} />
      <Route path="*" element={
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <h2>404 - Page Not Found</h2>
          <p style={{ margin: '1rem 0 2rem' }}>The page you're looking for doesn't exist or has been moved.</p>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3498db',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              ':hover': {
                backgroundColor: '#2980b9'
              }
            }}
          >
            Back to Home
          </Link>
        </div>
      } />
    </Routes>
  </main>
);

// Footer component
const Footer = () => (
  <footer style={{
    marginTop: '4rem',
    padding: '2rem 0',
    borderTop: '1px solid #eee',
    textAlign: 'center',
    color: '#7f8c8d',
    fontSize: '0.9rem'
  }}>
    <p>© {new Date().getFullYear()} Recipe Sharing App. All rights reserved.</p>
  </footer>
);

function App() {
  // Load sample data on first render
  const setRecipes = useRecipeStore(state => state.setRecipes);
  
  useEffect(() => {
    // Check if we already have recipes in localStorage
    const savedRecipes = localStorage.getItem('recipes');
    if (savedRecipes) {
      setRecipes(JSON.parse(savedRecipes));
    }
  }, [setRecipes]);

  // Save recipes to localStorage whenever they change
  const recipes = useRecipeStore(state => state.recipes);
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  return (
    <Router>
      <Layout>
        <Header />
        <MainContent />
        <Footer />
      </Layout>
    </Router>
  );
}

export default App;
