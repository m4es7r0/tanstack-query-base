import { TodoList } from "@/modules/todo-list";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div className="p-8">
      <TodoList />
    </div>
  ),
});
