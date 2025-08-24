import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  test('renders todo list with initial todos', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Build a todo app')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('add-todo-input');
    const button = screen.getByTestId('add-todo-button');
    
    fireEvent.change(input, { target: { value: 'New test todo' } });
    fireEvent.click(button);
    
    expect(screen.getByText('New test todo')).toBeInTheDocument();
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    
    const todoText = screen.getByTestId('todo-text-1');
    expect(todoText.parentElement).not.toHaveStyle('text-decoration: line-through');
    
    fireEvent.click(todoText);
    expect(todoText.parentElement).not.toHaveStyle('text-decoration: line-through');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    const deleteButton = screen.getByTestId('delete-1');
    fireEvent.click(deleteButton);
    
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  test('displays correct number of todos initially', () => {
    render(<TodoList />);
    
    const todos = screen.getAllByRole('listitem');
    expect(todos).toHaveLength(3);
  });
});