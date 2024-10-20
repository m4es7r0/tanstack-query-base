import { TodoListInfinity, TodoList } from "@/modules/todo-list";
import { Route } from "@/routes/__root";
import { TanstackProvider } from "@/shared/providers/tanstack";

function App() {
  return (
    <TanstackProvider>
      <div></div>
    </TanstackProvider>
  );
}

export default App;
