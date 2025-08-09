const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchRepos = async (username) => {
  const response = await fetch(`${baseUrl}/users/${username}/repos`, {
    headers: {
      Authorization: `token ${apiKey}`,
    },
  });
  return await response.json();
};