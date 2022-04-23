import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import "./TodoModal.css";
export const TodoModal = () => {
  const [todoInput, setTodoInput] = useState(false);
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);
  const [selectEdit, setselectEdit] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});
  const strikeThroughHandler = (id) => {
    const newTodo = todo.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setTodo(newTodo);
  };

  const addTodoHandler = (e) => {
    if (e.key === "Enter") {
      setTodo([
        ...todo,
        {
          id: uuid(),
          name: input,
          isDone: false,
        },
      ]);
      setInput("");
    }
  };

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todo))
  },[todo])

  const deleteTodoHandler = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };
  const editClickHandler = (todo) => {
    setselectEdit(true);
    setCurrentTodo({ ...todo });
  };

  const editChangeHandler = (e) => {
    setCurrentTodo({ ...currentTodo, name: e.target.value });
  };

  const updateHandler = () => {
    const updatedTodo = todo.map((todo) =>
      todo.id === currentTodo.id ? currentTodo : todo
    );
    setselectEdit(false);
    setTodo(updatedTodo);
  };
  return (
    <>
      <div className="todomodal-box">
        <div className={todo.length === 0 ? "add-todo-container" : undefined}>
          <div className="mt-5">
            {todo.length === 0 ? (
              <p className="mb-half white-color">No todos yet</p>
            ) : (
              todo.map((todo) => (
                <div className="todo-container" key={todo.id}>
                  <input
                    onClick={() => strikeThroughHandler(todo.id)}
                    className="todo-checkbox"
                    id="done-todo"
                    type="checkbox"
                  />
                  {!selectEdit ? (
                    <label
                      htmlFor="done-todo"
                      onClick={() => strikeThroughHandler(todo.id)}
                      className={`white-color ${
                        todo.isDone ? `done-todo` : undefined
                      }`}
                    >
                      {todo.name}
                    </label>
                  ) : (
                    <div>
                      <input
                        className="edit-input"
                        type="text"
                        value={currentTodo.name}
                        onChange={(e) => editChangeHandler(e)}
                        placeholder="Edit todo"
                      />
                      <button
                        className="btn update-btn"
                        onClick={updateHandler}
                      >
                        update
                      </button>
                    </div>
                  )}

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

            {!todoInput && (
              <button
                onClick={() => setTodoInput(true)}
                className="add-todo-btn btn"
              >
                Add Todo
              </button>
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
