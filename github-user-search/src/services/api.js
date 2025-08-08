import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const api = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

export const searchUser = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response?.status === 404) {
      return { data: null, error: 'User not found' };
    }
    return { data: null, error: 'Failed to fetch user. Please try again later.' };
  }
};

export const getUserRepos = async (username) => {
  try {
    const response = await api.get(`/users/${username}/repos?sort=updated&per_page=10`);
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: 'Failed to fetch repositories.' };
  }
};

// Add rate limit check if needed
export const checkRateLimit = async () => {
  try {
    const response = await api.get('/rate_limit');
    return response.data.resources.core;
  } catch (error) {
    console.error('Error checking rate limit:', error);
    return null;
  }
};
