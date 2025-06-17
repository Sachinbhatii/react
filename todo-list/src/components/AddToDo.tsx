import { useState } from "react";
import "./AddToDo.css";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import useTodos from "../utils/useTodos";

ModuleRegistry.registerModules([AllCommunityModule]);

type Todo = {
  id?: number;
  heading: string;
  description: string;
  completed?: boolean;
};

const AddToDo = () => {
  let [heading, setHeading] = useState("");
  let [description, setDescription] = useState("");
  let [todos, setTodos] = useTodos();
  const [editingId, setEditingId] = useState<number | null>(null);

  const [colDefs] = useState<ColDef<Todo>[]>([
    { field: 'heading' },
    { field: 'description' },
    { field: 'completed' }
  ]);

  const defaultColDef: ColDef = {
    flex: 1,
  };

  function addOrUpdateTodo() {
    if (heading.trim() === "" || description.trim() === "") return;

    if (editingId !== null) {
      // update existing todo
      setTodos((prev: Todo[]) =>
        prev.map((todo: Todo) =>
          todo.id === editingId
            ? { ...todo, heading: heading.trim(), description: description.trim() }
            : todo
        )
      );
    } else {
      // add new todo
      setTodos((prev: Todo[]) => [
        ...prev,
        {
          id: Date.now(),
          heading: heading.trim(),
          description: description.trim(),
          completed: false,
        },
      ]);
    }

    setHeading("");
    setDescription("");
    setEditingId(null);
  }

  function deleteToDo(id: number | undefined): void {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
    // If the todo being deleted is being edited, reset edit state:
    if (editingId === id) {
      setEditingId(null);
      setHeading("");
      setDescription("");
    }
  }

  function editToDo(id: number | undefined): void {
    const todoToEdit: Todo | undefined = todos.find((todo: Todo) => todo.id === id);

    if (todoToEdit) {
      setHeading(todoToEdit.heading);
      setDescription(todoToEdit.description);
      setEditingId(id ?? null);
    }
  }

  function toggleComplete(id: number | undefined): void {
    setTodos((prev: Todo[]) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteAllCompleted(): void {
    setTodos((prev: Todo[]) =>
      prev.filter((todo: Todo) => !todo.completed)
    );
    // If currently editing a completed todo, reset edit state
    if (editingId !== null) {
      const editingTodo = todos.find((t: Todo) => t.id === editingId);
      if (editingTodo?.completed) {
        setEditingId(null);
        setHeading("");
        setDescription("");
      }
    }
  }

  function cancelEdit() {
    setHeading("");
    setDescription("");
    setEditingId(null);
  }

  return (
    <div className="add-todo-container">
      <h2>Add To Do</h2>

      <input
        className="add-todo-input"
        type="text"
        placeholder="Heading"
        value={heading}
        onChange={(e) => setHeading(e.target.value)}
      />

      <textarea
        className="add-todo-textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="add-todo-actions-row">
        <button className="add-todo-button" onClick={addOrUpdateTodo}>
          {editingId !== null ? "Update Task" : "Add Task"}
        </button>
        {editingId !== null && (
          <button className="add-todo-button" onClick={cancelEdit} style={{ marginLeft: "8px" }}>
            Cancel
          </button>
        )}
        <button className="delete-all-todo-completed" onClick={deleteAllCompleted}>
          Clear Completed
        </button>
      </div>

      <ul className="add-todo-list">
        {todos.map((todo: Todo) => (
          <li
            key={todo.id}
            className={`add-todo-list-item${todo.completed ? " add-todo-completed" : ""}`}
          >
            <div className="add-todo-heading">
              <strong>{todo.heading}</strong>
            </div>
            <div className="add-todo-description">{todo.description}</div>
            <div className="add-todo-actions">
              <button
                className="add-todo-delete"
                onClick={() => deleteToDo(todo.id)}
                disabled={editingId !== null && editingId !== todo.id}
              >
                Delete
              </button>
              <button
                className="add-todo-edit"
                onClick={() => editToDo(todo.id)}
                disabled={editingId !== null && editingId !== todo.id}
              >
                Edit
              </button>
              <button
                className="add-todo-edit"
                style={{ background: todo.completed ? "#eab308" : "#3cb371" }}
                onClick={() => toggleComplete(todo.id)}
                disabled={editingId !== null && editingId !== todo.id}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* <div style={{ height: 500 }}>
        <AgGridReact
          rowData={todos}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div> */}
    </div>
  );
};

export default AddToDo;