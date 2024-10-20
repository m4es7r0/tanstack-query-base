import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todosAPI } from "./api";
import { useState } from "react";
import { LoaderCircleIcon } from "lucide-react";
import { Todo } from "./types";
import { cn } from "@/shared/utils/cn";

function TodoList() {
  const [page, setPage] = useState(1);

  const todos = useQuery({
    queryKey: ["todo", "list", `${page}`],
    queryFn: (meta) => todosAPI.getTodos({ page, perPage: 10 }, meta),
    placeholderData: keepPreviousData,
  });

  const handleChangePage = (direction: "next" | "prev", pages: number) => {
    switch (direction) {
      case "next":
        setPage((prev) => Math.min(prev + 1, pages));
        break;
      case "prev":
        setPage((prev) => Math.max(prev - 1, 1));
        break;
    }
  };

  return (
    <div className="mx-auto flex w-fit flex-col">
      <h1 className="text-xl">Todo List</h1>
      <div className="min-w-[288px] max-w-[320px] py-4">
        <div className="flex items-center justify-between">
          <TodoPagination
            prev={page <= 1}
            next={page >= (todos.data?.pages || 0)}
            handlePrev={() => handleChangePage("prev", todos.data?.pages || 0)}
            handleNext={() => handleChangePage("next", todos.data?.pages || 0)}
          />
          {todos.isPlaceholderData && (
            <LoaderCircleIcon className="animate-spin" />
          )}
        </div>
        {todos.isPending ? (
          <TodoListSkeleton count={10} />
        ) : (
          <>
            {todos.data?.data && (
              <>
                <ul className="mt-4 space-y-1">
                  {todos.data.data.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TodoList;

function TodoPagination({
  prev,
  next,
  handlePrev,
  handleNext,
}: {
  prev: boolean;
  next: boolean;
  handlePrev: () => void;
  handleNext: () => void;
}) {
  return (
    <div className="flex gap-2">
      <TodoPaginationButton disabled={prev} onClick={handlePrev}>
        Prev
      </TodoPaginationButton>
      <TodoPaginationButton disabled={next} onClick={handleNext}>
        Next
      </TodoPaginationButton>
    </div>
  );
}

function TodoPaginationButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      className="bg-neutral-900 px-4 py-1 transition disabled:bg-neutral-600 disabled:text-neutral-400"
      {...props}
    >
      {children}
    </button>
  );
}

export function TodoItem({ todo }: { todo: Todo }) {
  return (
    <li className="flex items-center justify-between rounded-xl bg-neutral-700 p-2">
      {todo.title}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={(e) => {
          console.log("checked", e.currentTarget.checked);
        }}
      />
    </li>
  );
}

export function TodoListSkeleton({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <ul className={cn("mt-4 space-y-1", className)}>
      {[...Array(count)].map((_, index) => (
        <li
          key={index}
          className="flex min-h-10 animate-pulse rounded-xl bg-neutral-700 p-2"
        ></li>
      ))}
    </ul>
  );
}
