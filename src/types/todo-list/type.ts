export interface TodoList {
  id: number;
  name: string;
  isCompleted: boolean;
}

export interface Todo {
  id: number;
  tenantId: string;
  name: string;
  memo: string | null;
  imageUrl: string | null;
  isCompleted: boolean;
}

export type TodoRequest = Omit<Todo, "id" | "tenantId">;
