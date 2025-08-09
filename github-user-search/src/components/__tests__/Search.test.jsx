import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Search from '../Search';

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
    
    expect(screen.getByPlaceholderText('Enter GitHub username...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch with the entered username', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Enter GitHub username...');
    const button = screen.getByRole('button', { name: /search/i });
    
    fireEvent.change(input, { target: { value: 'testuser' } });
    fireEvent.click(button);
    
    expect(mockOnSearch).toHaveBeenCalledWith('testuser');
  });

  it('shows loading state', () => {
    render(<Search onSearch={mockOnSearch} loading={true} />);
    
    expect(screen.getByText('Searching GitHub')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Search onSearch={mockOnSearch} error="User not found" />);
    
    expect(screen.getByText('Looks like we cant find the user')).toBeInTheDocument();
  });

  it('shows user data when provided', () => {
    render(<Search onSearch={mockOnSearch} userData={mockUserData} />);
    
    expect(screen.getByAltText(`${mockUserData.login}'s avatar`)).toHaveAttribute('src', mockUserData.avatar_url);
    expect(screen.getByText(mockUserData.login)).toBeInTheDocument();
  });

  it('disables the button when disabled prop is true', () => {
    render(<Search onSearch={mockOnSearch} disabled={true} />);
    
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
