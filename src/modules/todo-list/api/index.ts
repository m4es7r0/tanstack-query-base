import { Todo } from "../types";

const BASE_URL = "http://localhost:3001";

export type WithPagination<T> = {
  first: number,
  prev: null | number,
  next: null | number,
  last: number,
  pages: number,
  items: number,
  data: T[]
}

export const todosAPI = {
  async getTodos(
    { page = 1, perPage = 10 }: { page: number; perPage?: number },
    { signal }: { signal: AbortSignal },
  ) {
    return fetch(`${BASE_URL}/todos?_page=${page}&&_per_page=${perPage}`, {
      signal,
    }).then((res) => res.json() as Promise<TodosAPIGetTodosResponse>);
  },
};

export type TodosAPIGetTodosResponse = WithPagination<Todo>;