import { fetchUserData, searchUsers, getUserRepos } from '../githubService';
import axios from 'axios';

// Mock axios
jest.mock('axios');

describe('GitHub Service', () => {
  const mockUserData = {
    login: 'testuser',
    id: 123456,
    avatar_url: 'https://example.com/avatar.jpg',
    html_url: 'https://github.com/testuser',
    name: 'Test User',
    public_repos: 10,
    followers: 20,
    following: 5,
    bio: 'Test bio',
    location: 'Test Location',
    blog: 'https://testblog.com'
  };

  const mockRepos = [
    { id: 1, name: 'repo1', description: 'Test repo 1' },
    { id: 2, name: 'repo2', description: 'Test repo 2' }
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchUserData', () => {
    it('should fetch user data successfully', async () => {
      axios.get.mockResolvedValueOnce({ data: mockUserData });
      
      const result = await fetchUserData('testuser');
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/testuser',
        expect.any(Object)
      );
      expect(result).toEqual({
        data: {
          avatar_url: mockUserData.avatar_url,
          name: mockUserData.name,
          login: mockUserData.login,
          html_url: mockUserData.html_url,
          public_repos: mockUserData.public_repos,
          followers: mockUserData.followers,
          following: mockUserData.following,
          bio: mockUserData.bio,
          location: mockUserData.location,
          blog: mockUserData.blog
        },
        error: null
      });
    });

    it('should handle 404 error', async () => {
      const error = { response: { status: 404 } };
      axios.get.mockRejectedValueOnce(error);
      
      const result = await fetchUserData('nonexistentuser');
      
      expect(result).toEqual({
        data: null,
        error: 'User not found'
      });
    });

    it('should handle other errors', async () => {
      const error = new Error('Network Error');
      axios.get.mockRejectedValueOnce(error);
      
      const result = await fetchUserData('testuser');
      
      expect(result).toEqual({
        data: null,
        error: 'Failed to fetch user data. Please try again later.'
      });
    });
  });

  describe('searchUsers', () => {
    it('should search for users successfully', async () => {
      const mockSearchResults = { items: [mockUserData] };
      axios.get.mockResolvedValueOnce({ data: mockSearchResults });
      
      const result = await searchUsers('test');
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=test',
        expect.any(Object)
      );
      expect(result).toEqual([mockUserData]);
    });
  });

  describe('getUserRepos', () => {
    it('should fetch user repositories successfully', async () => {
      axios.get.mockResolvedValueOnce({ data: mockRepos });
      
      const result = await getUserRepos('testuser');
      
      expect(axios.get).toHaveBeenCalledWith(
        'https://api.github.com/users/testuser/repos',
        expect.any(Object)
      );
      expect(result).toEqual(mockRepos);
    });
  });
});
