import React, { useState } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build Todo App", completed: true },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <form onSubmit={addTodo}>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            onClick={() => toggleTodo(t.id)}
            style={{ textDecoration: t.completed ? "line-through" : "none" }}
          >
            {t.text}
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(t.id); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
