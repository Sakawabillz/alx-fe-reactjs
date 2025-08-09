import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

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
  try {
    const response = await githubApi.get(`/users/${encodeURIComponent(username)}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('User not found. Please check the username and try again.');
    }
    console.error('Error fetching user:', error);
    throw new Error('Failed to fetch user data. Please try again later.');
  }
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
  searchUsers,
  getUser,
  getUserRepos,
  getUserActivity
};
