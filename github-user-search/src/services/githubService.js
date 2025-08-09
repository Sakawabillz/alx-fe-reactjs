import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/** 
* Fetches GitHub user data based on username.
 * @param {string} username - GitHub username to search for.
 * @returns {Promise<object>} - The user data from GitHub API.
 */

const fetchUserData = async (username, location = '', minRepos = '', page = 1) => {
  try {
    let query = username ? `${username}` : '';
    if (location) query += `+location:${location}`;
    if (minRepos) query += `+repos:>=${minRepos}`;

    const response = await axios.get(`https://api.github.com/search/users?q=${query}&per_page=10&page=${page}`);

    return {
      users: response.data.items,
      totalCount: response.data.total_count,
    };
  } catch (error) {
    throw new Error('Failed to fetch user list');
  }
};

const fetchFullUserDetails = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${username}`);
    return res.data;
  } catch (err) {
    throw new Error('Failed to fetch full profile');
  }
};

export default {
  fetchUserData,
  fetchFullUserDetails,
};