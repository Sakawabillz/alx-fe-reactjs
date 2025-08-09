import { useState, useEffect } from 'react';
import { fetchUserData, getUserRepos, checkRateLimit } from './services/api';
import SearchBar from './components/SearchBar';
import UserProfile from './components/UserProfile';
import RepoList from './components/RepoList';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [rateLimit, setRateLimit] = useState({ remaining: 60, reset: 0 });

  // Check rate limit on initial load
  useEffect(() => {
    const checkRateLimits = async () => {
      try {
        const { data } = await checkRateLimit();
        setRateLimit({
          remaining: data.rate.remaining,
          reset: data.rate.reset * 1000 // Convert to milliseconds
        });
      } catch (err) {
        console.error('Error checking rate limit:', err);
      }
    };

    checkRateLimits();
  }, []);

  const searchUser = async (username) => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    // Check rate limit before making the request
    if (rateLimit.remaining <= 0) {
      const resetTime = new Date(rateLimit.reset).toLocaleTimeString();
      setError(`Rate limit exceeded. Please try again after ${resetTime}.`);
      return;
    }

    setLoading(true);
    setError('');
    setUser(null);
    setRepos([]);

    try {
      // Fetch user data
      const userResponse = await fetchUserData(username);
      
      if (userResponse.error) {
        setError(userResponse.error);
        setHasSearched(true);
        return;
      }

      setUser(userResponse.data);
      setHasSearched(true);

      // Update rate limit
      if (userResponse.rateLimit) {
        setRateLimit({
          remaining: userResponse.rateLimit.remaining,
          reset: userResponse.rateLimit.reset * 1000
        });
      }

      // If user has repos, fetch them
      if (userResponse.data.public_repos > 0) {
        const reposResponse = await getUserRepos(username);
        
        if (!reposResponse.error && reposResponse.data) {
          // Sort repos by stars (descending) and take top 10
          const sortedRepos = [...reposResponse.data]
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 10);
          
          setRepos(sortedRepos);
        }

        // Update rate limit after fetching repos
        if (reposResponse.rateLimit) {
          setRateLimit({
            remaining: reposResponse.rateLimit.remaining,
            reset: reposResponse.rateLimit.reset * 1000
          });
        }
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('An error occurred while fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (user) {
      searchUser(user.login);
    } else if (hasSearched) {
      // If there was an error but no user is set, clear the error
      setError('');
    }
  };

  // Format remaining time until rate limit resets
  const formatTimeUntilReset = () => {
    if (!rateLimit.reset) return '';
    
    const now = Date.now();
    const resetTime = new Date(rateLimit.reset);
    const diffInSeconds = Math.floor((resetTime - now) / 1000);
    
    if (diffInSeconds <= 0) return 'soon';
    
    const minutes = Math.floor(diffInSeconds / 60);
    const seconds = diffInSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate if rate limit is exceeded
  const isRateLimited = rateLimit.remaining <= 0;
  const rateLimitResetTime = new Date(rateLimit.reset).toLocaleTimeString();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">GitHub User Search</h1>
        <p className="app-description">
          Search for GitHub users and explore their profiles and repositories
        </p>
        <div className="rate-limit-badge" aria-live="polite">
          <span className="rate-limit-count">{rateLimit.remaining}</span> requests remaining
          {rateLimit.remaining < 10 && (
            <span className="rate-limit-reset"> (resets {formatTimeUntilReset()})</span>
          )}
        </div>
      </header>

      <main className="app-content">
        <SearchBar 
          onSearch={searchUser} 
          loading={loading} 
          disabled={isRateLimited}
          placeholder={
            isRateLimited 
              ? `Rate limited - try again after ${rateLimitResetTime}`
              : 'Enter GitHub username...'
          }
        />
        
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : error ? (
          <div className="error-container">
            <ErrorMessage 
              message={error} 
              onRetry={user ? () => searchUser(user.login) : null} 
            />
          </div>
        ) : user ? (
          <div className="results">
            <UserProfile user={user} />
            {repos.length > 0 && <RepoList repos={repos} />}
          </div>
        ) : hasSearched ? (
          <div className="no-results">
            <p>No user found. Please try another username.</p>
          </div>
        ) : (
          <div className="welcome-message">
            <h2>Welcome to GitHub User Search</h2>
            <p>Enter a GitHub username above to get started</p>
            <div className="search-tips">
              <p>Try searching for:</p>
              <div className="example-searches">
                <button 
                  type="button" 
                  className="example-search"
                  onClick={() => searchUser('facebook')}
                >
                  facebook
                </button>
                <button 
                  type="button" 
                  className="example-search"
                  onClick={() => searchUser('google')}
                >
                  google
                </button>
                <button 
                  type="button" 
                  className="example-search"
                  onClick={() => searchUser('microsoft')}
                >
                  microsoft
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="rate-limit">
            GitHub API requests remaining: <strong>{rateLimit.remaining}</strong>
            {rateLimit.remaining < 10 && (
              <span> (resets at {rateLimitResetTime})</span>
            )}
          </div>
          <p className="disclaimer">
            This application uses the GitHub API. Please be mindful of the rate limits.
            Not affiliated with GitHub, Inc.
          </p>
          <p className="copyright">
            &copy; {new Date().getFullYear()} GitHub User Search
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
