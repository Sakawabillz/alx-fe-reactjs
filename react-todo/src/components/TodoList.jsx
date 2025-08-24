import React, { useState } from 'react';
import AddTodoForm from './AddTodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Build a todo app', completed: true },
    { id: 3, text: 'Write tests', completed: false }
  ]);

  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div data-testid="todo-list">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      
      <ul>
        {todos.map(todo => (
          <li 
            key={todo.id} 
            data-testid={`todo-${todo.id}`}
            style={{ 
              textDecoration: todo.completed ? 'line-through' : 'none',
              margin: '10px 0'
            }}
          >
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{ cursor: 'pointer', marginRight: '10px' }}
              data-testid={`todo-text-${todo.id}`}
            >
              {todo.text}
            </span>
            <button 
              onClick={() => deleteTodo(todo.id)}
              data-testid={`delete-${todo.id}`}
              style={{ marginLeft: '10px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;