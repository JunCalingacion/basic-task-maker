
import React, { useEffect } from "react";
import { useTodo } from "@/context/TodoContext";
import { TodoItem } from "./TodoItem";
import { TodoFilter } from "./TodoFilter";

export const TodoList = () => {
  const { filteredTodos } = useTodo();

  useEffect(() => {
    console.log("TodoList component rendered");
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {filteredTodos.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title} // Changed from 'text' to 'title'
              completed={todo.completed}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p className="mb-2 text-lg">No tasks to display</p>
          <p className="text-sm">
            {filteredTodos.length === 0 && "Start by adding a new task!"}
          </p>
        </div>
      )}
      
      <TodoFilter />
    </div>
  );
};
