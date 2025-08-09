import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from './Search';

// Mock the Loading component
jest.mock('./Loading', () => {
  return function MockLoading() {
    return <div data-testid="loading">Loading...</div>;
  };
});

// Mock the fetchUserData function
const mockFetchUserData = jest.fn();
jest.mock('../../services/githubService', () => ({
  fetchUserData: (username) => mockFetchUserData(username)
}));

describe('Search Component', () => {
  const mockOnSearch = jest.fn();
  
  // Reset mocks between tests
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input and button with default placeholder', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('uses custom placeholder when provided', () => {
    const customPlaceholder = 'Enter username...';
    render(<Search onSearch={mockOnSearch} placeholder={customPlaceholder} />);
    
    expect(screen.getByPlaceholderText(customPlaceholder)).toBeInTheDocument();
  });

  it('updates search input value when typing', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    fireEvent.change(input, { target: { value: 'testuser' } });
    
    expect(input.value).toBe('testuser');
  });

  it('shows loading state when searching', async () => {
    // Mock a pending promise to test loading state
    mockFetchUserData.mockImplementation(() => new Promise(() => {}));
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);
    
    // Check if loading state is shown
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('calls onSearch with user data when search is successful', async () => {
    const mockUserData = {
      login: 'testuser',
      name: 'Test User',
      avatar_url: 'https://example.com/avatar.jpg'
    };
    
    mockFetchUserData.mockResolvedValueOnce({ data: mockUserData, error: null });
    
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(mockUserData);
    });
  });
});
