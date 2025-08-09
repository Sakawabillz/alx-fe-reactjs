import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

// Mock the Loading component
jest.mock('./Loading', () => {
  return function MockLoading({ message }) {
    return <div data-testid="loading">{message}</div>;
  };
});

// Mock the searchUsers function
const mockSearchUsers = jest.fn();
jest.mock('../../services/githubService', () => ({
  searchUsers: mockSearchUsers,
  fetchUserData: jest.fn() // Keep this for any other components that might use it
}));

describe('Search Component', () => {
  const mockOnSearch = jest.fn();
  
  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Renders search input and button with default placeholder
  it('renders search input and button with default placeholder', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  // Test 2: Uses custom placeholder when provided
  it('uses custom placeholder when provided', () => {
    const customPlaceholder = 'Enter username...';
    render(<Search onSearch={mockOnSearch} placeholder={customPlaceholder} />);
    
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  // Test 3: Updates search input value when typing
  it('updates search input value when typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    fireEvent.change(input, { target: { name: 'username', value: 'testuser' } });
    
    expect(input.value).toBe('testuser');
  });

  // Test 4: Shows error when submitting empty form
  it('shows error when submitting empty form', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);
    
    expect(screen.getByText('Please enter a GitHub username')).toBeInTheDocument();
  });

  // Test 5: Shows loading state when searching
  it('shows loading state when searching', async () => {
    // Mock a slow API response
    mockSearchUsers.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve({
        items: [{ login: 'testuser', id: 1 }],
        total_count: 1
      }), 100))
    );
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { name: 'username', value: 'testuser' } });
    fireEvent.click(button);
    
    // Should show loading state
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toHaveTextContent('Searching GitHub users...');
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });
  });

  // Test 6: Calls onSearch with user data when search is successful
  it('calls onSearch with user data when search is successful', async () => {
    const mockUserData = {
      id: 1,
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg',
      html_url: 'https://github.com/testuser',
      public_repos: 10,
      followers: 20,
      bio: 'Test bio',
      location: 'Test Location'
    };
    
    mockSearchUsers.mockResolvedValueOnce({
      items: [mockUserData],
      total_count: 1
    });
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { name: 'username', value: 'testuser' } });
    fireEvent.click(button);
    
    // Wait for the API call to complete
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith([mockUserData]);
    });
  });

  // Test 7: Shows error message when no users are found
  it('shows error message when no users are found', async () => {
    mockSearchUsers.mockResolvedValueOnce({
      items: [],
      total_count: 0
    });
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'nonexistent' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('No users found matching your criteria.')).toBeInTheDocument();
    });
    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  // Test 8: Shows error message when API call fails
  it('handles API errors gracefully', async () => {
    const errorMessage = 'API Error';
    mockSearchUsers.mockRejectedValueOnce(new Error(errorMessage));
    
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { name: 'username', value: 'testuser' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByText('An error occurred while searching. Please try again.')).toBeInTheDocument();
    });
    
    expect(consoleErrorSpy).toHaveBeenCalledWith('Search error:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });

  // Test 9: Clears input when clear button is clicked
  it('clears input when clear button is clicked', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    const clearButton = screen.getByRole('button', { name: /clear/i });
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
    expect(input).toHaveFocus();
  });
});
