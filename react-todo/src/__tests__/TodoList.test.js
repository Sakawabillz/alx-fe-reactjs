import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build Todo App")).toBeInTheDocument();
});

test("adds a new todo", () => {
  render(<TodoList />);
  fireEvent.change(screen.getByPlaceholderText("Add a new todo"), {
    target: { value: "New Task" },
  });
  fireEvent.click(screen.getByText("Add"));
  expect(screen.getByText("New Task")).toBeInTheDocument();
});

test("toggles a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  fireEvent.click(todo);
  expect(todo).toHaveStyle("text-decoration: line-through");
});

test("deletes a todo", () => {
  render(<TodoList />);
  fireEvent.click(screen.getAllByText("Delete")[0]);
  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});
