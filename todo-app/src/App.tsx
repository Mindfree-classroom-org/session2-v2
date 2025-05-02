import { useState } from "react";
import { MdAdd, MdDelete } from "react-icons/md";
import "./App.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Tasks</h1>
        <div className="input-container">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            onKeyPress={(e) => e.key === "Enter" && addTodo()}
            aria-label="New task input"
          />
          <button
            onClick={addTodo}
            className="add-button"
            aria-label="Add task"
          >
            <MdAdd size={28} />
          </button>
        </div>
        <ul className="todo-list">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`todo-item ${todo.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                aria-label={`Mark "${todo.text}" as ${
                  todo.completed ? "incomplete" : "complete"
                }`}
              />
              <span>{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
                aria-label={`Delete "${todo.text}"`}
              >
                <MdDelete size={22} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
