import { useTodo } from "../../Context/Todo-context";
import { TodoModal } from "../TodoModal/TodoModal";
import "../Todo/Todo.css";
export const Todo = () => {
  const { todoModal, setTodoModal } = useTodo();
  const todoHandler = () => {
    if (todoModal) {
      setTodoModal(false);
    } else {
      setTodoModal(!todoModal);
    }
  };
  return (
    <div className="align-end">
      {todoModal && <TodoModal />}
      <span onClick={() => todoHandler()} data-hover="Todo" className="todo-title h3">
        Todo
      </span>
    </div>
  );
};
