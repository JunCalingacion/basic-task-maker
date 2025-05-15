
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/context/TodoContext";
import { Plus, Search, X } from "lucide-react";

export const TodoInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  const { addTodo, searchTerm, setSearchTerm } = useTodo();

  useEffect(() => {
    console.log("TodoInput component rendered");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("TodoInput: Submit event triggered");
    if (!isSearchMode && inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Always filter tasks as user types, regardless of mode
    console.log("TodoInput: Filtering tasks:", value);
    setSearchTerm(value);
  };

  const toggleMode = () => {
    setIsSearchMode(!isSearchMode);
    setInputValue("");
    setSearchTerm("");
  };

  const clearSearch = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full">
      <div className="flex-1 relative">
        <Input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder={isSearchMode ? "Search tasks..." : "Add a task..."}
          className="w-full pr-8"
        />
        {inputValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Button 
        type="button" 
        onClick={toggleMode} 
        variant="outline"
        className="bg-white hover:bg-gray-50"
      >
        {isSearchMode ? <Plus className="h-5 w-5" /> : <Search className="h-5 w-5" />}
      </Button>
      
      {!isSearchMode && (
        <Button type="submit" className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700">
          <Plus className="h-5 w-5" />
          <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">Add</span>
        </Button>
      )}
    </form>
  );
};
