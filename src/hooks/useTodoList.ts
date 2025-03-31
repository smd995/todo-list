import { useCallback, useEffect, useState } from "react";
import { api } from "@/effects/todo-api/todoApi";
import { TodoList } from "@/types/todo-list/type";

export const useTodoList = () => {
  const [list, setList] = useState<TodoList[]>([]);
  const [name, setName] = useState("");

  const isActive = name.trim() !== "";

  const fetchTodos = useCallback(async () => {
    const updated = await api.findAll();
    setList(updated);
  }, []);

  const onRegisterClick = async () => {
    if (!name.trim()) return;
    await api.registerOne(name);
    setName("");
    await fetchTodos();
  };

  const onToggleCompletedClick = async (id: number, currentStatus: boolean) => {
    await api.isCompleted(id, !currentStatus);
    await fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const todos = list.filter((todo) => !todo.isCompleted);
  const dones = list.filter((todo) => todo.isCompleted);

  return {
    name,
    setName,
    isActive,
    todos,
    dones,
    onRegisterClick,
    onToggleCompletedClick,
  };
};
