import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../Search';

// Mock the API module
jest.mock('../../services/githubService', () => ({
  fetchUserData: jest.fn()
}));

import { fetchUserData } from '../../services/githubService';

describe('Search Component', () => {
  const mockOnSearch = jest.fn();
  const mockUserData = {
    login: 'testuser',
    avatar_url: 'https://example.com/avatar.jpg',
    name: 'Test User'
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls fetchUserData with the entered username', async () => {
    fetchUserData.mockResolvedValueOnce({ 
      data: mockUserData, 
      error: null 
    });
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Searching GitHub')).toBeInTheDocument();
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(fetchUserData).toHaveBeenCalledWith('testuser');
    });
  });
  
  it('shows error message when user is not found', async () => {
    fetchUserData.mockResolvedValueOnce({ 
      data: null, 
      error: 'User not found' 
    });
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'nonexistent' } });
    fireEvent.click(button);
    
    // Wait for the error state
    await waitFor(() => {
      expect(screen.getByText('Looks like we cant find the user')).toBeInTheDocument();
    });
  });
});
