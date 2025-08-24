import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('renders add todo form', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    expect(screen.getByTestId('add-todo-form')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
  });

  test('allows user to input text', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'New todo item' } });
    
    expect(input.value).toBe('New todo item');
  });

  test('calls onAddTodo when form is submitted with text', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    const button = screen.getByTestId('add-todo-button');
    
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.click(button);
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item');
    expect(input.value).toBe('');
  });

  test('does not call onAddTodo when form is submitted with empty text', () => {
    render(<AddTodoForm onAddTodo={mockOnAddTodo} />);
    
    const button = screen.getByTestId('add-todo-button');
    fireEvent.click(button);
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});