
import React, { useEffect } from "react";
import { useTodo } from "@/context/TodoContext";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TodoItemProps = {
  id: string;
  title: string; // Changed from 'text' to 'title'
  completed: boolean;
};

export const TodoItem = ({ id, title, completed }: TodoItemProps) => { // Changed from 'text' to 'title'
  const { toggleTodo, deleteTodo } = useTodo();
  
  useEffect(() => {
    console.log(`TodoItem component rendered: ${id}`);
  }, [id]);

  const handleToggle = () => {
    console.log(`TodoItem: Toggle event triggered for "${title}" (${id})`); // Changed from 'text' to 'title'
    toggleTodo(id);
  };

  const handleDelete = () => {
    console.log(`TodoItem: Delete event triggered for "${title}" (${id})`); // Changed from 'text' to 'title'
    deleteTodo(id);
  };

  return (
    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100 gap-3 group hover:shadow-md transition-all">
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "rounded-full h-6 w-6 transition-colors",
          completed ? "bg-purple-500 text-white border-purple-500" : "border-gray-300"
        )}
        onClick={handleToggle}
      >
        {completed && <Check className="h-4 w-4" />}
      </Button>
      
      <span
        className={cn(
          "flex-1 transition-all",
          completed && "line-through text-gray-400"
        )}
      >
        {title} {/* Changed from 'text' to 'title' */}
      </span>
      
      <Button
        variant="ghost"
        size="icon"
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
