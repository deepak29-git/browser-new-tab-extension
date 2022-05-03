import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./TodoModal.css";
export const TodoModal = () => {
  const [todoInput, setTodoInput] = useState(false);
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [selectEdit, setselectEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const strikeThroughHandler = (id) => {
    const newTodo = todos.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );

    setTodos(newTodo);
  };

  const addTodoHandler = (e) => {
    if (e.key === "Enter") {
      if (!input) {
        return;
      }
      setTodos([
        ...todos,
        {
          id: uuid(),
          name: input,
          isDone: false,
        },
      ]);
      setInput("");
    }
  };


 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
  const editClickHandler = (todo) => {
    setselectEdit(true);
    setCurrentTodo({ ...todo });
  };

  const editChangeHandler = (e) => {
    setCurrentTodo({ ...currentTodo, name: e.target.value });
  };

  const updateHandler = () => {
    const updatedTodo = todos.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setselectEdit(false);
    setTodos(updatedTodo);
  };
  return (
    <>
      <div className="todomodal-box">
        <div className={todos.length === 0 ? "add-todo-container" : undefined}>
          <div className="mt-5">
            {todos.length === 0 ? (
              <p className="mb-half white-color">No todos yet</p>
            ) : (
              todos.map((todo) => (
                <div className="todo-container" key={todo.id}>
                  <input
                    checked={todo.isDone}
                    className="todo-checkbox"
                    type="checkbox"
                    onChange={()=>strikeThroughHandler(todo.id)}
                  />

                  <label
                    className={`white-color ${
                      todo.isDone ? `done-todo` : undefined
                    }`}
                  >
                    {todo.name}
                  </label>

                  <span
                    onClick={() => editClickHandler(todo)}
                    className="edit-icon material-icons-outlined"
                  >
                    edit
                  </span>
                  <span
                    onClick={() => deleteTodoHandler(todo.id)}
                    className="delete-icon material-icons-outlined"
                  >
                    delete
                  </span>
                </div>
              ))
            )}

            {selectEdit && (
              <div>
                <input
                  className="edit-input"
                  type="text"
                  value={currentTodo.name}
                  onChange={(e) => editChangeHandler(e)}
                  placeholder="Edit todo"
                />
                <button className="btn update-btn" onClick={updateHandler}>
                  Update
                </button>
                <button
                  className="btn cancel-btn"
                  onClick={() => setselectEdit(false)}
                >
                  Cancel
                </button>
              </div>
            )}

            {!todoInput && (
              <div className="center">

              <button
                onClick={() => setTodoInput(true)}
                className="add-todo-btn btn"
                >
                Add Todo
              </button>
                </div>
            )}
          </div>
          <div className="todo-input-container">
            {todoInput && (
              <input
                onKeyDown={(e) => addTodoHandler(e)}
                onChange={(e) => setInput(e.target.value)}
                className="todo-input"
                placeholder="New Todo"
                type="text"
                value={input}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
