import { useState } from 'react';
import { searchUser, getUserRepos } from './services';
import { SearchBar, UserProfile, RepoList, Loading, ErrorMessage } from './components';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (username) => {
    setLoading(true);
    setError('');
    
    try {
      // Fetch user data
      const { data: userData, error: userError } = await searchUser(username);
      
      if (userError) {
        setError(userError);
        setUser(null);
        setRepos([]);
        return;
      }
      
      setUser(userData);
      
      // Fetch user repositories
      const { data: reposData } = await getUserRepos(username);
      setRepos(reposData || []);
      
    } catch (err) {
      setError('An error occurred while fetching data. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>GitHub User Search</h1>
        <SearchBar onSearch={handleSearch} loading={loading} />
      </header>

      <main>
        {loading && <Loading />}
        
        <ErrorMessage 
          message={error} 
          onRetry={error ? () => handleSearch(user?.login || '') : null} 
        />
        
        {user && (
          <div className="content">
            <UserProfile user={user} />
            <RepoList repos={repos} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
