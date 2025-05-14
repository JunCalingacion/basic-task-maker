
import React, { useEffect } from "react";
import { useTodo } from "@/context/TodoContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const TodoFilter = () => {
  const { filter, setFilter, todos } = useTodo();
  
  useEffect(() => {
    console.log("TodoFilter component rendered");
  }, []);
  
  const filters: { value: "all" | "active" | "completed"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  const handleFilterChange = (newFilter: "all" | "active" | "completed") => {
    console.log(`TodoFilter: Filter changed to ${newFilter}`);
    setFilter(newFilter);
  };

  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-2 border-t gap-4">
      <div className="text-sm text-gray-500">
        {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
      </div>
      
      <div className="flex gap-2">
        {filters.map((item) => (
          <Button
            key={item.value}
            variant="ghost"
            size="sm"
            onClick={() => handleFilterChange(item.value)}
            className={cn(
              "text-sm",
              filter === item.value && "bg-purple-100 text-purple-700"
            )}
          >
            {item.label}
            {item.value === "active" && activeCount > 0 && (
              <span className="ml-1 text-xs bg-purple-500 text-white rounded-full px-1.5 py-0.5">
                {activeCount}
              </span>
            )}
            {item.value === "completed" && completedCount > 0 && (
              <span className="ml-1 text-xs bg-gray-500 text-white rounded-full px-1.5 py-0.5">
                {completedCount}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};
