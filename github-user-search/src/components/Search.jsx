import { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { searchUsers } from '../services/githubService';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const Search = ({ onSearch, placeholder = 'Search GitHub users...' }) => {
  // Form state
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: ''
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  
  const inputRef = useRef(null);
  const formRef = useRef(null);

  // Focus the input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when typing
    if (error) setError('');
  };

  // Handle search submission
  const handleSearch = useCallback(async (params, pageNum = 1) => {
    setLoading(true);
    setError('');
    
    try {
      const { items, total_count } = await searchUsers({
        ...params,
        page: pageNum
      });
      
      if (items && items.length > 0) {
        setSearchResults(items);
        setTotalResults(total_count);
        if (onSearch) {
          onSearch(items);
        }
      } else {
        setError('No users found matching your criteria.');
        setSearchResults([]);
        setTotalResults(0);
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
      setSearchResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [onSearch]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, ...filters } = searchParams;
    
    if (!username.trim() && !filters.location && !filters.minRepos && !filters.language) {
      setError('Please enter at least one search criteria');
      inputRef.current?.focus();
      return;
    }
    
    setPage(1);
    await handleSearch(searchParams, 1);
  };
  
  // Handle pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
    handleSearch(searchParams, newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Toggle advanced search
  const toggleAdvancedSearch = () => {
    setShowAdvanced(!showAdvanced);
  };

  // Display loading state
  if (loading) {
    return <Loading message="Searching GitHub users..." />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <form 
        ref={formRef} 
        onSubmit={handleSubmit} 
        className="bg-white rounded-lg shadow-md p-6 mb-6"
      >
        <div className="flex flex-col space-y-4">
          {/* Username Search */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="username"
                id="username"
                ref={inputRef}
                value={searchParams.username}
                onChange={handleInputChange}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2 border"
                placeholder={placeholder}
              />
            </div>
          </div>

          {/* Advanced Search Toggle */}
          <div className="pt-2">
            <button
              type="button"
              onClick={toggleAdvancedSearch}
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center focus:outline-none"
            >
              {showAdvanced ? (
                <>
                  <FiChevronUp className="mr-1" /> Hide Advanced Search
                </>
              ) : (
                <>
                  <FiChevronDown className="mr-1" /> Advanced Search
                </>
              )}
            </button>
          </div>

          {/* Advanced Search Fields */}
          {showAdvanced && (
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="e.g., San Francisco"
                />
              </div>

              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Repositories
                </label>
                <input
                  type="number"
                  name="minRepos"
                  id="minRepos"
                  min="0"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="e.g., 10"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Language
                </label>
                <input
                  type="text"
                  name="language"
                  id="language"
                  value={searchParams.language}
                  onChange={handleInputChange}
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
                  placeholder="e.g., JavaScript, Python"
                />
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-red-600 text-sm mt-2">
              {error}
            </div>
          )}

          {/* Search Button */}
          <div className="mt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </span>
              ) : 'Search'}
            </button>
          </div>
        </div>
      </form>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Search Results
              <span className="ml-2 text-sm text-gray-500">
                ({totalResults} {totalResults === 1 ? 'result' : 'results'} found)
              </span>
            </h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {searchResults.map((user) => (
              <li key={user.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center">
                  <img 
                    className="h-10 w-10 rounded-full mr-4" 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`} 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      <a 
                        href={user.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {user.name || user.login}
                      </a>
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user.login}
                    </p>
                    {user.bio && (
                      <p className="mt-1 text-sm text-gray-500">
                        {user.bio}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                      {user.location && (
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {user.location}
                        </div>
                      )}
                      <div className="flex items-center">
                        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        {user.public_repos || 0} repositories
                      </div>
                      {user.followers !== undefined && (
                        <div className="flex items-center">
                          <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          {user.followers} followers
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination */}
          {totalResults > 10 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page * 10 >= totalResults}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{(page - 1) * 10 + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(page * 10, totalResults)}
                    </span>{' '}
                    of <span className="font-medium">{totalResults}</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">First</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M16.25 10a.75.75 0 01-.75.75H6.75a.75.75 0 010-1.5h8.75a.75.75 0 01.75.75z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, Math.ceil(totalResults / 10)) }, (_, i) => {
                      let pageNum;
                      const totalPages = Math.ceil(totalResults / 10);
                      
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === pageNum
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page * 10 >= totalResults}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handlePageChange(Math.ceil(totalResults / 10))}
                      disabled={page * 10 >= totalResults}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="sr-only">Last</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M3.75 10a.75.75 0 01.75-.75h8.75a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func,
  placeholder: PropTypes.string
};

export default Search;
