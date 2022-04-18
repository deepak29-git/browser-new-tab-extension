import { createContext, useContext, useState } from "react";

const TodoContext = createContext(null);

const TodoProvider = ({ children }) => {
  const [todoModal, setTodoModal] = useState(false);
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  return (
    <TodoContext.Provider value={{ todoModal, setTodoModal, todo, setTodo,input, setInput }}>
      {children}
    </TodoContext.Provider>
  );
};

const useTodo = () => useContext(TodoContext);

export { useTodo, TodoProvider };
