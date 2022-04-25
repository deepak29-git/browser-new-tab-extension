import { useState } from "react";
import { TodoModal } from "../TodoModal/TodoModal";
import "../Todo/Todo.css";
export const Todo = () => {
  const [todoModal, setTodoModal] = useState(false);
  const todoHandler = () => {
    if (todoModal) {
      setTodoModal(false);
    } else {
      setTodoModal(!todoModal);
    }
  };
  return (
    <>
      {todoModal && <TodoModal />}
    <div className="align-end">
      <span onClick={() => todoHandler()} data-hover="Todo" className="todo-title h3">
        Todo
      </span>
    </div>
    </>
  );
};
