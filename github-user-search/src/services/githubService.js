import axios from 'axios';

const GITHUB_API_URL = 'https://api.github.com';

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json'
  }
});

// Helper function to build search query
export const buildSearchQuery = (params) => {
  const { username, location, minRepos, language } = params;
  let queryParts = [];
  
  if (username) queryParts.push(`${username} in:login`);
  if (location) queryParts.push(`location:${location}`);
  if (minRepos) queryParts.push(`repos:>${minRepos}`);
  if (language) queryParts.push(`language:${language}`);
  
  return queryParts.join('+');
};

// Search users with advanced filters
export const searchUsers = async (searchParams) => {
  try {
    const query = buildSearchQuery(searchParams);
    const response = await githubApi.get(`/search/users?q=${encodeURIComponent(query)}&per_page=10`);
    
    // Fetch detailed user data for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await fetchUserData(user.login);
        return userDetails.data || user;
      })
    );
    
    return {
      total_count: response.data.total_count,
      items: usersWithDetails
    };
  } catch (error) {
    console.error('Error searching users:', error);
    throw new Error('Failed to search users. Please try again later.');
  }
};

// Get detailed user data
export const fetchUserData = async (username) => {
  try {
    const [userResponse, reposResponse] = await Promise.all([
      githubApi.get(`/users/${encodeURIComponent(username)}`),
      githubApi.get(`/users/${encodeURIComponent(username)}/repos?per_page=100`)
    ]);
    
    const userData = userResponse.data;
    const repos = reposResponse.data;
    
    // Calculate additional statistics
    const languages = {};
    let totalStars = 0;
    let totalForks = 0;
    
    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });
    
    const mostUsedLanguage = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .map(([lang]) => lang)
      .slice(0, 3);
    
    return { 
      data: {
        id: userData.id,
        avatar_url: userData.avatar_url,
        name: userData.name || userData.login,
        login: userData.login,
        html_url: userData.html_url,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        bio: userData.bio,
        location: userData.location,
        blog: userData.blog,
        company: userData.company,
        email: userData.email,
        twitter_username: userData.twitter_username,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        // Additional calculated fields
        total_stars: totalStars,
        total_forks: totalForks,
        languages: mostUsedLanguage,
        avg_stars_per_repo: userData.public_repos > 0 ? (totalStars / userData.public_repos).toFixed(1) : 0
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
