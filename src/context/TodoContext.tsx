
import React, { createContext, useContext, useState, useEffect } from "react";

type Todo = {
  id: string;
  title: string; // Changed from 'text' to 'title'
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (title: string) => void; // Changed parameter name
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  filter: "all" | "active" | "completed";
  setFilter: (filter: "all" | "active" | "completed") => void;
  filteredTodos: Todo[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => { // Changed parameter name
    if (title.trim()) {
      const newTodo = { id: crypto.randomUUID(), title, completed: false }; // Changed from 'text' to 'title'
      console.log("TodoContext: Adding todo:", newTodo);
      setTodos([...todos, newTodo]);
      setSearchTerm(""); // Clear search term after adding
    }
  };

  const toggleTodo = (id: string) => {
    console.log("TodoContext: Toggling todo completion:", id);
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    console.log("TodoContext: Deleting todo:", id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      return true;
    })
    .filter((todo) => {
      return searchTerm === "" || 
        todo.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        filter,
        setFilter,
        filteredTodos,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
}
