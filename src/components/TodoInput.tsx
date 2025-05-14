
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTodo } from "@/context/TodoContext";
import { Plus } from "lucide-react";

export const TodoInput = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();

  useEffect(() => {
    console.log("TodoInput component rendered");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6 w-full">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
        className="flex-1"
      />
      <Button type="submit" className="bg-gradient-to-r from-purple-400 to-purple-600 hover:from-purple-500 hover:to-purple-700">
        <Plus className="h-5 w-5" />
        <span className="sr-only md:not-sr-only md:ml-2 md:inline-block">Add</span>
      </Button>
    </form>
  );
};
