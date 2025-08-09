import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

/**
 * Fetches user data from GitHub API
 * @param {string} username - GitHub username to search for
 * @returns {Promise<{data: Object|null, error: string|null}>} - User data or error message
 */
export const fetchUserData = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return { 
      data: {
        avatar_url: response.data.avatar_url,
        name: response.data.name || response.data.login,
        login: response.data.login,
        html_url: response.data.html_url,
        public_repos: response.data.public_repos,
        followers: response.data.followers,
        following: response.data.following,
        bio: response.data.bio,
        location: response.data.location,
        blog: response.data.blog
      }, 
      error: null 
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return { data: null, error: 'User not found' };
    }
    console.error('Error fetching user data:', error);
    return { 
      data: null, 
      error: error.message || 'Failed to fetch user data. Please try again later.' 
    };
  }
};

// Legacy function (kept for backward compatibility)
export const searchUser = fetchUserData;

/**
 * Fetches user repositories
 * @param {string} username - GitHub username
 * @returns {Promise<{data: Array|null, error: string|null}>} - Repositories or error message
 */
export const getUserRepos = async (username) => {
  try {
    const response = await api.get(`/users/${username}/repos?sort=updated&per_page=10`);
    return { 
      data: response.data.map(repo => ({
        id: repo.id,
        name: repo.name,
        html_url: repo.html_url,
        description: repo.description,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language
      })), 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return { 
      data: null, 
      error: 'Failed to fetch repositories. Please try again later.' 
    };
  }
};

/**
 * Checks GitHub API rate limits
 * @returns {Promise<Object|null>} - Rate limit information or null if failed
 */
export const checkRateLimit = async () => {
  try {
    const response = await api.get('/rate_limit');
    return response.data.resources.core;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return null;
  }
};
