import { useState } from "react";
import { useTodo } from "../../Context/Todo-context";
import { v4 as uuid } from "uuid";
import "./TodoModal.css";
export const TodoModal = () => {
  const [todoInput, setTodoInput] = useState(false);
  const { todo, setTodo, input, setInput } = useTodo();

  const strikeThroughHandler = (id) => {
    const newTodo = todo.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setTodo(newTodo);
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
                  <label
                    htmlFor="done-todo"
                    onClick={() => strikeThroughHandler(todo.id)}
                    className={`white-color ${
                      todo.isDone ? `done-todo` : undefined
                    }`}
                  >
                    {todo.name}
                  </label>
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
                onKeyDown={(e) => {
                  const addObj = {
                    id: uuid(),
                    name: input,
                    isDone: false,
                  };
                  e.key === "Enter" && setTodo([...todo, addObj]);
                  // setInput("");
                }}
                onChange={(e) => setInput(e.target.value)}
                className="todo-input"
                placeholder="New Todo"
                type="text"
                // value={input}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
