
import React, { useEffect } from "react";
import { TodoProvider } from "@/context/TodoContext";
import { TodoInput } from "@/components/TodoInput";
import { TodoList } from "@/components/TodoList";
import { ListTodo } from "lucide-react";

const Index = () => {
  useEffect(() => {
    console.log("Index page component rendered");
  }, []);

  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 px-4 py-12">
        <div className="max-w-md mx-auto">
          <header className="mb-8 text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-lg shadow-lg mb-4">
              <ListTodo className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-1">Todo App</h1>
            <p className="text-gray-600">Stay organized and get things done</p>
          </header>
          
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default Index;
