import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Alias for getUser to match expected function name
export const fetchUserData = async (username) => {
  try {
    const response = await githubApi.get(`/users/${encodeURIComponent(username)}`);
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

export const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${encodeURIComponent(query)}`);
    return response.data.items;
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users. Please try again later.');
  }
};

export const getUser = async (username) => {
  const { data, error } = await fetchUserData(username);
  if (error) throw new Error(error);
  return data;
};

export const getUserRepos = async (username) => {
  try {
    const response = await githubApi.get(`/users/${encodeURIComponent(username)}/repos`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    throw new Error('Failed to fetch user repositories.');
  }
};

export const getUserActivity = async (username) => {
  try {
    const response = await githubApi.get(`/users/${encodeURIComponent(username)}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user activity:', error);
    throw new Error('Failed to fetch user activity.');
  }
};

export default {
  fetchUserData,
  searchUsers,
  getUser,
  getUserRepos,
  getUserActivity
};
