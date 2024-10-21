import { TanstackProvider } from "@/shared/providers/tanstack";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <TanstackProvider>
      <div className="flex gap-2 p-2">
        <Link to="/" className="[&.active]:text-white">
          TodoList
        </Link>
        |
        <Link to="/infinity" className="[&.active]:text-white">
          TodoListInfinity
        </Link>
      </div>
      {/* <hr /> */}
      <Outlet />
      {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
    </TanstackProvider>
  ),
});
