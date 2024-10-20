import { TodoListInfinity } from "@/modules/todo-list";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/infinity")({
  component: () => (
    <div className="p-8">
      <TodoListInfinity />
    </div>
  ),
});
