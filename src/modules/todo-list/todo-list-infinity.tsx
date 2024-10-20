import { TodoItem, TodoListSkeleton } from "./todo-list";
import { todosAPI } from "./api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "./model/useIntersection";
import { LoaderCircleIcon } from "lucide-react";

function TodoListInfinity() {
  const todos = useInfiniteQuery({
    queryKey: ["todo", "list", "infinity"],
    queryFn: (meta) =>
      todosAPI.getTodos({ page: meta.pageParam, perPage: 10 }, meta),
    initialPageParam: 1,
    getNextPageParam: (result) => result.next,
    select: (result) => result.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersection(() => {
    todos.fetchNextPage();
  });

  return (
    <div className="mx-auto flex w-fit flex-col">
      <div className="flex items-center justify-between">
        <h1 className="text-xl">Todo List Infinity</h1>
        {todos.isFetchingNextPage && (
          <LoaderCircleIcon className="size-[24px] animate-spin" />
        )}
      </div>
      <div className="min-w-[288px] max-w-[320px] flex-1 py-4">
        {todos.isPending ? (
          <TodoListSkeleton count={10} className="mt-0" />
        ) : (
          <>
            {todos.data && (
              <ul className="max-h-[436px] space-y-1 overflow-auto">
                {todos.data.map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))}
                <div ref={cursorRef}>
                  {!todos.hasNextPage && (
                    <div className="p-4 text-center">No more data :(</div>
                  )}
                </div>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TodoListInfinity;
