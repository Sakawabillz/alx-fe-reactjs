// src/components/__tests__/TodoList.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component', () => {
    render(<TodoList />);
    expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  test('renders initial todos', () => {
    render(<TodoList />);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write tests')).toBeInTheDocument();
    expect(screen.getByText('Build todo app')).toBeInTheDocument();
    
    // Check if there are 3 initial todos
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(3);
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);

    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Check if input is cleared after adding
    expect(input.value).toBe('');
  });

  test('does not add empty todos', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    // Try to add empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // Should still have only 3 initial todos
    const todoItems = screen.getAllByTestId(/todo-item-/);
    expect(todoItems).toHaveLength(3);
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    const todoText = screen.getByTestId('todo-text-1');

    // Initially not completed
    expect(todoText).toHaveStyle('text-decoration: none');

    // Click to toggle
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through');

    // Click again to toggle back
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    const deleteButton = screen.getByTestId('delete-button-1');
    const todoToDelete = screen.getByText('Learn React');

    // Verify todo exists
    expect(todoToDelete).toBeInTheDocument();

    // Delete the todo
    fireEvent.click(deleteButton);

    // Verify todo is removed
    expect(todoToDelete).not.toBeInTheDocument();
    
    // Check if we now have 2 todos instead of 3
    const remainingTodos = screen.getAllByTestId(/todo-item-/);
    expect(remainingTodos).toHaveLength(2);
  });

  test('handles form submission with Enter key', () => {
    render(<TodoList />);
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('add-todo-form');

    fireEvent.change(input, { target: { value: 'Todo via Enter' } });
    fireEvent.submit(form);

    expect(screen.getByText('Todo via Enter')).toBeInTheDocument();
    expect(input.value).toBe('');
  });

  test('initial todo states are correct', () => {
    render(<TodoList />);
    
    // Check that the third todo is initially completed
    const completedTodoText = screen.getByTestId('todo-text-3');
    expect(completedTodoText).toHaveStyle('text-decoration: line-through');
    
    // Check that first two todos are not completed
    const firstTodoText = screen.getByTestId('todo-text-1');
    const secondTodoText = screen.getByTestId('todo-text-2');
    expect(firstTodoText).toHaveStyle('text-decoration: none');
    expect(secondTodoText).toHaveStyle('text-decoration: none');
  });
});
