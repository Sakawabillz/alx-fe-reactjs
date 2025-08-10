import React, { useState } from 'react';
import githubService from '../services/githubService';


const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUsers([]);
    setPage(1);

    try {
      const { users: searchResults, totalCount } = await githubService.fetchUserData(username, location, minRepos, 1);

      const detailedUsers = await Promise.all(
        searchResults.map(user => githubService.fetchFullUserDetails(user.login))
      );

      setUsers(detailedUsers);
      setHasMore(totalCount > 10);
    } catch (err) {
      setError('Looks like we cant find the user(s)');
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);
    const nextPage = page + 1;

    try {
      const { users: moreUsers } = await githubService.fetchUserData(username, location, minRepos, nextPage);

      const detailedUsers = await Promise.all(
        moreUsers.map(user => githubService.fetchFullUserDetails(user.login))
      );

      setUsers(prev => [...prev, ...detailedUsers]);
      setPage(nextPage);
      setHasMore(moreUsers.length > 0);
    } catch (err) {
      setError('Could not load more users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-md rounded-xl">
        <h2 className="text-xl font-semibold text-gray-700">GitHub Advanced User Search</h2>

        <input
          type="text"
          placeholder="GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Location (optional)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Minimum Repos (optional)"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-4 text-center text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* User List */}
      <div className="mt-6 space-y-6">
        {users.map((user) => (
          <div key={user.id} className="p-4 border rounded-md shadow">
            <div className="flex items-center space-x-4">
              <img src={user.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full" />
              <div>
                <h3 className="text-lg font-semibold">{user.name || user.login}</h3>
                <p className="text-gray-600">{user.location || 'Location not available'}</p>
                <p className="text-gray-500">Public Repos: {user.public_repos}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-1 block"
                >
                  Visit GitHub Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && !loading && (
        <button
          onClick={loadMore}
          className="mt-6 mx-auto block px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;