import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

const SearchBar = ({ onSearch, loading, disabled, placeholder = 'Enter GitHub username...', userData, error: propError }) => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Focus the input on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Clear error when username changes
  useEffect(() => {
    if (error) setError('');
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setError('Please enter a GitHub username');
      inputRef.current.focus();
      return;
    }
    
    try {
      await onSearch(trimmedUsername);
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      inputRef.current.focus();
    }
  };

  // Display loading state
  if (loading) {
    return <Loading message="Searching GitHub" />;
  }

  // Display error state
  if (propError) {
    return (
      <div className="search-error" role="alert">
        <img 
          src="/user-not-found.svg" 
          alt="User not found" 
          className="search-error__image"
          width="200"
          height="200"
        />
        <p className="search-error__message">
          Looks like we can't find the user "{username}"
        </p>
      </div>
    );
  }

  // Display user data if available
  if (userData) {
    return (
      <div className="user-result">
        <div className="user-avatar">
          <img 
            src={userData.avatar_url} 
            alt={`${userData.login}'s avatar`} 
            className="user-avatar__image"
            width="120"
            height="120"
          />
          <h2 className="user-avatar__username">{userData.login}</h2>
        </div>
      </div>
    );
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setUsername('');
      inputRef.current.focus();
    } else if (e.key === 'Enter' && e.ctrlKey) {
      // Allow submitting with Ctrl+Enter
      formRef.current.requestSubmit();
    }
  };

  const handleClear = () => {
    setUsername('');
    inputRef.current.focus();
  };

  return (
    <div 
      className="search-bar-container" 
      data-testid="search-bar"
      role="search"
      aria-label="GitHub user search"
    >
      <form 
        ref={formRef}
        onSubmit={handleSubmit} 
        className="search-bar-form"
        noValidate
      >
        <div className={`search-bar-input-container ${isFocused ? 'focused' : ''} ${error ? 'error' : ''}`}>
          <span className="search-bar-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          
          <input
            ref={inputRef}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="search-bar-input"
            disabled={loading || disabled}
            aria-label="GitHub username"
            aria-describedby={error ? 'search-error' : 'search-help'}
            aria-invalid={!!error}
            aria-busy={loading}
            autoCapitalize="off"
            autoComplete="username"
            autoCorrect="off"
            spellCheck="false"
            enterKeyHint="search"
          />
          
          {username && (
            <button 
              type="button" 
              className="search-bar-clear"
              onClick={handleClear}
              disabled={loading || disabled}
              aria-label="Clear search"
              tabIndex={username ? 0 : -1}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          
          <div className="search-bar-divider" />
          
          <button 
            type="submit" 
            className="search-bar-submit"
            disabled={loading || disabled || !username.trim()}
            aria-label={loading ? 'Searching...' : 'Search GitHub user'}
            aria-live="polite"
          >
            {loading ? (
              <span className="search-bar-spinner" aria-hidden="true" />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
            <span className="sr-only">Search</span>
          </button>
        </div>
        
        <div className="search-bar-meta">
          {error ? (
            <p id="search-error" className="search-bar-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </p>
          ) : (
            <p id="search-help" className="search-bar-hint">
              Press Enter to search, Ctrl+Enter to submit
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  userData: PropTypes.shape({
    avatar_url: PropTypes.string,
    login: PropTypes.string,
    name: PropTypes.string,
    html_url: PropTypes.string,
    public_repos: PropTypes.number,
    followers: PropTypes.number,
    following: PropTypes.number,
    bio: PropTypes.string,
    location: PropTypes.string,
    blog: PropTypes.string
  }),
  error: PropTypes.string
};

// Add default props for better documentation
Search.defaultProps = {
  loading: false,
  disabled: false,
  placeholder: 'Enter GitHub username...',
  userData: null,
  error: null
};

export default Search;
